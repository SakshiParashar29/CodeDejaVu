const User = require('../models/user-model');
const asyncHandler = require('../utils/async-handler');
const ApiResponse = require('../utils/api-response');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../lib/hash');
const { createAccessToken, createRefreshToken, verifyRefreshToken } = require('../lib/token');
const crypto = require('crypto');
const sendEmail = require('../lib/email');


function getAppUrl() {
    const url = process.env.CLIENT_URL || "http://localhost:5173";
    return url;
}

const verifyEmailHandler = asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json(new ApiResponse(400, "Token is required"));
    }

     const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({ emailVerifyToken: hashedToken, emailVerifyTokenExpires: { $gt: new Date() } });

    if (!user) {
        return res.status(400).json(new ApiResponse(400, "Invalid or expired token"));
    }

    user.isEmailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyTokenExpires = undefined;
    await user.save();

    return res.status(200).json(new ApiResponse(200, 'Email Verified Successfully'));
})

const registerHandler = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    const normalisedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ $or: [{ username }, { email: normalisedEmail }] });
    if (existingUser) {
        return res.status(409).json(new ApiResponse(409, "Username or email already in use"));
    }

    const hashedPassword = await hashPassword(password);
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(verifyToken).digest('hex');


    const user = await User.create({
        username,
        email: normalisedEmail,
        passwordHash: hashedPassword,
        emailVerifyToken: hashedToken,
        emailVerifyTokenExpires: new Date(Date.now() + 1000 * 60 * 30)
    });

    const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verifyToken}`;

    await sendEmail(
        user.email,
        'Verify Your Email',
        `<p>Please verify your email by clicking: <a href="${verifyUrl}">${verifyUrl}</a></p>`
    );

    return res.status(201).json(new ApiResponse(201, "Account created. Please verify your email.", { username: user.username }));
});

const loginHandler = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!user) {
        return res.status(404).json(new ApiResponse(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) {
        return res.status(400).json(new ApiResponse(401, "Invalid password"));
    }

    if (!user.isEmailVerified) {
        return res.status(400).json(new ApiResponse(400, "Email not verified. Please verify your email!"));
    }

    const accessToken = createAccessToken(user.id, user.username, user.tokenVersion);
    const refreshToken = createRefreshToken(user.id, user.tokenVersion);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    console.log("Login");


    return res.status(200).json(new ApiResponse(200, "Logged in successfully", {
        token: accessToken,
        user: {
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        }
    }));
});

const getProfileHandler = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "Profile fetched successfully", {
        username: req.user.username,
        email: req.user.email,
        nemesis: req.user.nemesis,
        profile: req.user.profile,
        isEmailVerified: req.user.isEmailVerified,
    }));
})

const updateNemesisHandler = asyncHandler(async (req, res) => {
    const { nemesis } = req.body;

    if (!nemesis) {
        return res.status(400).json(new ApiResponse(400, "Nemesis is required"));
    }

    req.user.nemesis = nemesis;
    await req.user.save();

    return res.status(200).json(new ApiResponse(200, "Nemesis updated", { nemesis: req.user.nemesis }));
});

const logOutHandler = asyncHandler(async (req, res) => {
    res.clearCookie('refreshToken', { path: '/' });
    return res.status(200).json(new ApiResponse(200, 'LogOut successfull'));
})

const refreshTokensHandler = asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
        return res.status(401).json(new ApiResponse(401, "Invalid Token"));
    }

    let payload;
    try {
        payload = verifyRefreshToken(token);
    } catch (err) {
        return res.status(401).json(new ApiResponse(401, "Invalid or expired refresh token"));
    }

    const user = await User.findById(payload.sub);

    if (!user) {
        return res.status(400).json(new ApiResponse(400, 'Invalid user'));
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json(new ApiResponse(401, 'Invalid refresh token'));
    }

    const newAccessToken = createAccessToken(user.id, user.username, user.tokenVersion);

    const newRefreshToken = createRefreshToken(user.id, user.tokenVersion);

    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(new ApiResponse(200, 'Token Refreshed', {
        token: newAccessToken,
        user: {
            id: user.id,
            email: user.email,
            isEmailVerified: user.isEmailVerified
        }
    }));
})

const forgetPasswordHandler = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json(new ApiResponse(400, "Email is required"));
    }

    const normalisedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalisedEmail });

    if (!user) {
        return res.status(200).json(new ApiResponse(200, "If an account with this email exists, a reset link has been sent"));
    }

    const rawToken = await crypto.randomBytes(32).toString('hex');
    const tokenHash = await crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    const resetURL = `${getAppUrl()}/auth/reset-password?token=${rawToken}`;

    await sendEmail(
        user.email,
        'Reset Password',
        `<p>Please click on the link to reset your password: <a href=${resetURL}>${resetURL}</a></p>`
    );

    return res.json({
        message: "If an account with this email exists, we will send you a reset link!"
    });
});

const resetPasswordHandler = asyncHandler(async (req, res) => {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
        return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    if (password !== confirmPassword) {
        return res.status(400).json(new ApiResponse(400, "Passwords do not match"));
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid or expire token"
        });
    }

    const newPasswordHash = await hashPassword(password);

    user.passwordHash = newPasswordHash;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.tokenVersion = user.tokenVersion + 1;

    await user.save();

    return res.status(200).json({
        message: "Password reset successfully! Please log in again."
    })

});

module.exports = { registerHandler, loginHandler, getProfileHandler, verifyEmailHandler, updateNemesisHandler, logOutHandler, refreshTokensHandler, forgetPasswordHandler, resetPasswordHandler };


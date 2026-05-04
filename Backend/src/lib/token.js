const jwt = require('jsonwebtoken');

const createAccessToken = (userId, username, tokenVersion) => {
    const payload = {
        sub: userId,
        username,
        tokenVersion
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '30m'
    });

    return accessToken;
}

const createRereshToken = (userId, tokenVersion) => {
    const payload = {
        sub: userId,
        tokenVersion
    }

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7D'
    });

    return refreshToken;
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

module.exports = {createAccessToken, createRereshToken, verifyAccessToken, verifyRefreshToken};
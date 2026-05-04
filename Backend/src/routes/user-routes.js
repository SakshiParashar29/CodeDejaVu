const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { registerHandler, loginHandler, logOutHandler, verifyEmailHandler, getProfileHandler, updateNemesisHandler, refreshTokensHandler, forgetPasswordHandler, resetPasswordHandler } = require('../controllers/user-controller');

const router = express.Router();

//auth
router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/logout', logOutHandler);

router.get('/verify-email', verifyEmailHandler);
router.post('/refresh', refreshTokensHandler);

router.get('/profile', authMiddleware,getProfileHandler);
router.patch('/nemesis', authMiddleware, updateNemesisHandler);

router.post('/forget-password', forgetPasswordHandler);
router.post('/reset-password', resetPasswordHandler);


module.exports = router
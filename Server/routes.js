const express = require('express');
const { signupUser, loginUser, forgotPassword, resetPassword } = require('./controller/user-controller');
const { profilePost } = require('./controller/profile-controller');
const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/profile', profilePost);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = {
    router
}
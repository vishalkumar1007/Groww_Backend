// import express from 'express';
const express = require('express');
const UserRouter = express.Router();

const { handelUserSignUp, handelToVerifyUserEmail, handelToUserLogin, handelToUserForgotPassword, handelVerificationOtpForForgot, handelToUpdatePassword , handelToVerifyToken} = require('../controllers/userController');


UserRouter.post('/signup', handelUserSignUp);
UserRouter.get('/emailVerification', handelToVerifyUserEmail);
UserRouter.get('/login', handelToUserLogin);
UserRouter.get('/forgot', handelToUserForgotPassword);
UserRouter.get('/otpVerification', handelVerificationOtpForForgot);
UserRouter.post('/updatePassword', handelToUpdatePassword);
UserRouter.get('/verify/token', handelToVerifyToken);

module.exports = UserRouter;
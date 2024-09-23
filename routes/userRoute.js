// import express from 'express';
const express = require('express');
const UserRouter = express.Router();
const {handelUserSignUp , handelToVerifyUserEmail , handelToUserLogin} = require('../controllers/userController');

UserRouter.post('/signup',handelUserSignUp);
UserRouter.get('/emailVerification', handelToVerifyUserEmail);
UserRouter.get('/login', handelToUserLogin);

module.exports = UserRouter;
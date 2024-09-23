// import express from 'express';
const express = require('express');
const UserRouter = express.Router();
const {handelToGetAllUser} = require('../controllers/userController');

UserRouter.get('/all',handelToGetAllUser);

module.exports = UserRouter;
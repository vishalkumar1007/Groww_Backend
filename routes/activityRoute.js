const express = require('express');
const activityRoute = express.Router();

const {handelToRecordUserVisit , getVisitorNumber} = require('../controllers/activityController');

activityRoute.get('/newVisit',handelToRecordUserVisit);
activityRoute.get('/getVisitorNumber',getVisitorNumber);

module.exports = activityRoute;
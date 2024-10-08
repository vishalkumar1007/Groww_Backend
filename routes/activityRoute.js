const express = require('express');
const activityRoute = express.Router();

const {handelToRecordUserVisit} = require('../controllers/activityController');

activityRoute.get('/newVisit',handelToRecordUserVisit);

module.exports = activityRoute;
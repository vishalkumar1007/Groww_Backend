const express = require('express');
const StockRouter = express.Router();
const {handelToGetStockData,handelAllStockHead} = require('../controllers/stockController');

StockRouter.get('/getById',handelToGetStockData);
StockRouter.get('/getAllHead',handelAllStockHead);

module.exports = StockRouter;
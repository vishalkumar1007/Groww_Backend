const express = require('express');
const StockRouter = express.Router();
const {handelToGetStockData,handelAllStockHead,handelToGetStockHeadLimit} = require('../controllers/stockController');

StockRouter.get('/getById',handelToGetStockData);
StockRouter.get('/getAllHead',handelAllStockHead);
StockRouter.get('/getAllHead/limit',handelToGetStockHeadLimit);

module.exports = StockRouter;
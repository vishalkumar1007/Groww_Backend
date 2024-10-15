const express = require('express');
const StockRouter = express.Router();
const {handelToGetStockData,handelAllStockHead,handelToGetStockHeadLimit,handelToGetStockHeadRandomData} = require('../controllers/stockController');

StockRouter.get('/getById',handelToGetStockData);
StockRouter.get('/getAllHead',handelAllStockHead);
StockRouter.get('/getAllHead/limit',handelToGetStockHeadLimit);
StockRouter.get('/getAllHeadRandomData/limit',handelToGetStockHeadRandomData);

module.exports = StockRouter;
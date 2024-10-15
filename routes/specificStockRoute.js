const express =  require('express');
const SpecificStockRoute = express.Router();
const {mostBoughtOnGroww, topGainer, stockInNews, topLosers} = require('../controllers/specificStockHeadController');


SpecificStockRoute.get('/mostBoughtOnGrowwStocks',mostBoughtOnGroww);
SpecificStockRoute.get('/topGainerStocks',topGainer);
SpecificStockRoute.get('/newsStock',stockInNews);
SpecificStockRoute.get('/topLoserStocks',topLosers);

module.exports = SpecificStockRoute;
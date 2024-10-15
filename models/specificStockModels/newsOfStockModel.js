const mongoose = require('mongoose');

const newsOfStockSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    logoUrl:{
        type:String,
        require:true,
    },
    stockCost:{
        type:String,
        require:true
    },
    stockCostPerRate:{
        type:String,
        require:true
    }
});

const newsOfStockModel = mongoose.model('NewsOfStock',newsOfStockSchema);
module.exports = newsOfStockModel;
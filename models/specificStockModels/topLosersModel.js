const mongoose = require('mongoose');

const topLosersSchema = new mongoose.Schema({
    stock_id:{
        type:String,
        require:true
    },
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

const topLosersModel = mongoose.model('TopLoserStock',topLosersSchema);
module.exports = topLosersModel;
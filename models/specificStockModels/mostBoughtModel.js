const mongoose = require('mongoose');

const mostBoughtSchema = new mongoose.Schema({
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

const mostBoughtModel = mongoose.model('MostBoughtOnGrowwStock',mostBoughtSchema);
module.exports = mostBoughtModel;
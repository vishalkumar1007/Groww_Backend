const mongoose = require('mongoose');

const topGainersSchema = new mongoose.Schema({
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

const topGainersModel = mongoose.model('TopGainerStock',topGainersSchema);
module.exports = topGainersModel;
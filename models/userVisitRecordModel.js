const mongoose = require('mongoose');

const userCountSchema = new mongoose.Schema({
    increment_unique_id : {
        type:String,
        require:true,
        default:'increment@key07OfVishalkumar07.me'
    },
    visitCount : {
        type:Number,
        require:true,
        default:0
    }
})

const userCountModal = mongoose.model('userVisit' , userCountSchema);

module.exports = userCountModal;
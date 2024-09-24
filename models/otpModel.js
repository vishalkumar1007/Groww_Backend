const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email : {
        type:String,
        require:true,
        unique:true
    },
    otp:{
        type:String,
        require:true
    }
})

const otpModal = mongoose.model('users_otp',otpSchema);

module.exports = otpModal;
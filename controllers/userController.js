const userModel = require('../models/userModel')

const handelToGetAllUser = (req,res)=>{
    res.status(200).json({data:'ok'});
}

module.exports = {
    handelToGetAllUser
}
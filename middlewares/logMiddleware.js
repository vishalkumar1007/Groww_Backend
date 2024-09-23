const logModel = require('../models/logModel');

const createLogData = async (req,res)=>{
    const dateTime = new Date();
    const customLogData = {
        status: res.statusCode,
        method: req.method,
        url: req.url,
        date: dateTime.toDateString(),
        time: dateTime.toTimeString()
    };

    logModel.create(customLogData)
    .then((data)=>{
        if (data) {
            console.log('Log generated');
        } else {
            console.log('trebling on generate log');
        }
    })
    .catch((err) => {
        console.log('Error on create log ', err);
    })
}

module.exports = createLogData;
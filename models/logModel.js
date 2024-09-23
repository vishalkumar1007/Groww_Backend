const mongoose =  require('mongoose');

// logData schema
const logSchema = new mongoose.Schema({
    status: {
        type: Number,
        require: true
    },
    method: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
})

// logData model
const logModal = mongoose.model('logData', logSchema);

module.exports = logModal;
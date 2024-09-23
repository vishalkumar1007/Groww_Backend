const mongoose = require('mongoose');

const ConnectDB = (url)=>{
    mongoose.connect(url)
    .then(() => {
        console.log('Mongodb connect successfully with',process.env.DB_CONNECT_LOCALHOST==='true'?'{localhost}':'{atlas cloud}');
    })
    .catch((err) => {
        console.log('Error while connecting mongodb', err);
    })
}

module.exports = ConnectDB;
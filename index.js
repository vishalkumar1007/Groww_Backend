const express = require('express');
const dotenv = require('dotenv');

// import files
const userRoute = require('./routes/userRoute');
const ConnectDB = require('./connection/connection');
const createLogData = require('./middlewares/logMiddleware');

// config .env
dotenv.config();

// create app
const app = express();

// custom middleware
app.use((req,res,next)=>{
    res.on('finish',()=>{
        createLogData(req,res);
    })
    next();
})

// connect with DB
const atlasConnectionUri = process.env.DB_CONNECT_LOCALHOST==='true' ? process.env.MONGO_LOCALHOST_URI : process.env.MONGODB_ATLAS_URI;
ConnectDB(atlasConnectionUri);


// default route
app.get('/',(req,res)=>{
    try{
        res.status(200).json({message:"Welcome to by Vishal" , info:"API service available on route /api"});
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
});

// configure PORT
const PORT = process.env.PORT || 4040;

// setup routes
app.use('/api/user',userRoute);

// make listen our server to http
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
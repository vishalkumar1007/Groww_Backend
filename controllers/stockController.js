const stockModel = require('../models/stockModel');
const allStockHead = require('../models/allStockHeadModel');

const handelToGetStockData = async (req,res)=>{
    try {
        const {stock_id} = req.query;

        if(!stock_id){
            console.log('stock_id require');
            res.status(401).json({msg:'expect stock_id through params'});
            return;
        }

        const data  = await stockModel.find({stock_id});

        if(data){
            res.status(200).json(data);
            return;
        }
        
        res.status(404).json({msg:`stock not found with id ${stock_id}`});

    } catch (error) {
        console.log('Internal server error on handelToGetStockData')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

const handelAllStockHead = async (req,res)=>{
    try {
        const stockHeadData = await allStockHead.find({});

        if(stockHeadData){
            res.status(200).json(stockHeadData);
            return;
        }

        res.status(404).json({msg:`stock data not found`});

    } catch (error) {
        console.log('Internal server error on handelAllStockHead')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

const handelToGetStockHeadLimit = async (req,res)=>{
    try {
        const {dataLen} = req.query;

        if(!dataLen){
            console.log('Data len is require in handelToGetStockHeadLimit');
            res.status(401).json({msg:'expect dataLen in params'});
            return;
        }

        const stockHeadDataLimit = await allStockHead.find({}).limit(Number(dataLen));

        if(stockHeadDataLimit){
            res.status(200).json(stockHeadDataLimit);
            return;
        }

        res.status(404).json({msg:'data not found'});

    } catch (error) {
        console.log('Internal server error on handelAllStockHead')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

module.exports = {
    handelToGetStockData,
    handelAllStockHead,
    handelToGetStockHeadLimit
}
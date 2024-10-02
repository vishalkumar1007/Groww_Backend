const stockModel = require('../models/stockModel');
const allStockHead = require('../models/allStockHeadModel');

const handelToGetStockData = async (req,res)=>{
    try {
        const {stock_id} = req.query;

        if(!stock_id){
            console.log('Stock id require');
            res.status(401).json({msg:'stock id require'});
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

module.exports = {
    handelToGetStockData,
    handelAllStockHead
}
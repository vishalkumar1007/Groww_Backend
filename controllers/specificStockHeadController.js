const mostBoughtModel = require('../models/specificStockModels/mostBoughtModel');
const topGainersModel = require('../models/specificStockModels/topGainersModel');
const newsOfStockModel = require('../models/specificStockModels/newsOfStockModel');
const topLosersModel = require('../models/specificStockModels/topLosersModel');
const allStockHeadModel = require('../models/allStockHeadModel');
const jwt = require('jsonwebtoken');

let mostBoughtToken = null;
let topGainerToken = null;
let stockNewsToken = null;
let topLoserToken = null;


const mostBoughtOnGroww = async (req, res) => {
    try {
        const Secret_Key = process.env.AUTH_SECRET_KEY;
        const isAlreadyData = await mostBoughtModel.find({});
        console.log('No data in mostBoughtOnGroww : ',isAlreadyData.length==0);
        if (!mostBoughtToken || isAlreadyData.length===0) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                return;
            }

            for (let i = 1; i <= 4; i++) {
                const random = Math.floor(Math.random() * (AllStockHeadData.length));
                const data = {
                    stock_id: AllStockHeadData[random].stock_id,
                    name: AllStockHeadData[random].name,
                    logoUrl: AllStockHeadData[random].logoUrl,
                    stockCost: AllStockHeadData[random].stockCost,
                    stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                }

                await mostBoughtModel.create(data);
            }

            // generate jwt         

            const payload = {
                purpose: 'change data after 1m',
                type: 'auth token'
            }
            mostBoughtToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
            console.log('token generated in mostBoughtOnGroww');
        }

        jwt.verify(mostBoughtToken, Secret_Key, async (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('Token expires -- process of new data in mostBoughtOnGroww');
                    const AllStockHeadData = await allStockHeadModel.find({});
                    if (!AllStockHeadData) {
                        res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                        return;
                    }
                    const deletePvrData = await mostBoughtModel.deleteMany({});

                    if (!deletePvrData) {
                        res.status(500).json({ msg: 'Error in deleting data in mostBoughtOnGroww', success: 'access denied' });
                        return;
                    }

                    for (let i = 1; i <= 4; i++) {
                        const random = Math.floor(Math.random() * (AllStockHeadData.length));
                        const data = {
                            stock_id: AllStockHeadData[random].stock_id,
                            name: AllStockHeadData[random].name,
                            logoUrl: AllStockHeadData[random].logoUrl,
                            stockCost: AllStockHeadData[random].stockCost,
                            stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                        }

                        await mostBoughtModel.create(data);
                    }
                    // generate token

                    const payload = {
                        purpose: 'change data after 1m',
                        type: 'auth token'
                    }
                    mostBoughtToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
                    console.log('token generated in mostBoughtOnGroww');

                } else {
                    console.log('token auth fail in mostBoughtOnGroww')
                    res.status(400).json({ msg: 'token auth fail in mostBoughtOnGroww', success: 'access denied' });
                    return;
                }
            }
            const mostBoughtStockData = await mostBoughtModel.find({});
            if(!mostBoughtStockData){
                res.status(404).json({ msg: 'Data not found in mostBoughtOnGroww', success: 'access denied' });
                return;
            }

            res.status(200).json(mostBoughtStockData);
        })
    } catch (error) {
        console.log('Internal server error on handelUserSignUp')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }

}


const topGainer = async (req, res) => {
    try {
        const Secret_Key = process.env.AUTH_SECRET_KEY;
        const isAlreadyData = await topGainersModel.find({});
        console.log('No data in topGainer : ',isAlreadyData.length===0);
        if (!topGainerToken || isAlreadyData.length===0) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from AllStockHeadData', success: 'access denied' });
                return;
            }

            for (let i = 1; i <= 4; i++) {
                const random = Math.floor(Math.random() * (AllStockHeadData.length));
                const data = {
                    stock_id: AllStockHeadData[random].stock_id,
                    name: AllStockHeadData[random].name,
                    logoUrl: AllStockHeadData[random].logoUrl,
                    stockCost: AllStockHeadData[random].stockCost,
                    stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                }

                await topGainersModel.create(data);
            }

            // generate jwt         

            const payload = {
                purpose: 'change data after 1m',
                type: 'auth token'
            }
            topGainerToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
            console.log('token generated in topGainer');
        }

        jwt.verify(topGainerToken, Secret_Key, async (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('Token expires -- process of new data in topGainer');
                    const AllStockHeadData = await allStockHeadModel.find({});
                    if (!AllStockHeadData) {
                        res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                        return;
                    }
                    const deletePvrData = await topGainersModel.deleteMany({});

                    if (!deletePvrData) {
                        res.status(500).json({ msg: 'Error in deleting data in topGainer', success: 'access denied' });
                        return;
                    }

                    for (let i = 1; i <= 4; i++) {
                        const random = Math.floor(Math.random() * (AllStockHeadData.length));
                        const data = {
                            stock_id: AllStockHeadData[random].stock_id,
                            name: AllStockHeadData[random].name,
                            logoUrl: AllStockHeadData[random].logoUrl,
                            stockCost: AllStockHeadData[random].stockCost,
                            stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                        }

                        await topGainersModel.create(data);
                    }
                    // generate token

                    const payload = {
                        purpose: 'change data after 1m',
                        type: 'auth token'
                    }
                    topGainerToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
                    console.log('token generated in topGainer phase 2');

                } else {
                    console.log('token auth fail in topGainer')
                    res.status(400).json({ msg: 'token auth fail in topGainer', success: 'access denied' });
                    return;
                }
            }
            const topGainerStockData = await topGainersModel.find({});
            if(!topGainerStockData){
                res.status(404).json({ msg: 'Data not found in topGainer', success: 'access denied' });
                return;
            }

            res.status(200).json(topGainerStockData);
        })
    } catch (error) {
        console.log('Internal server error on topGainer')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }

}


const stockInNews = async (req, res) => {
    try {
        const Secret_Key = process.env.AUTH_SECRET_KEY;
        const isAlreadyData = await newsOfStockModel.find({});
        console.log('No data in stockInNews : ',isAlreadyData.length===0);
        if (!stockNewsToken || isAlreadyData.length===0) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                return;
            }

            for (let i = 1; i <= 4; i++) {
                const random = Math.floor(Math.random() * (AllStockHeadData.length));
                const data = {
                    stock_id: AllStockHeadData[random].stock_id,
                    name: AllStockHeadData[random].name,
                    logoUrl: AllStockHeadData[random].logoUrl,
                    stockCost: AllStockHeadData[random].stockCost,
                    stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                }

                await newsOfStockModel.create(data);
            }

            // generate jwt         

            const payload = {
                purpose: 'change data after 1m',
                type: 'auth token'
            }
            stockNewsToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
            console.log('token generated in stockInNews');
        }

        jwt.verify(stockNewsToken, Secret_Key, async (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('Token expires -- process of new data in stockInNews');
                    const AllStockHeadData = await allStockHeadModel.find({});
                    if (!AllStockHeadData) {
                        res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                        return;
                    }
                    const deletePvrData = await newsOfStockModel.deleteMany({});

                    if (!deletePvrData) {
                        res.status(500).json({ msg: 'Error in deleting data in stockInNews', success: 'access denied' });
                        return;
                    }

                    for (let i = 1; i <= 4; i++) {
                        const random = Math.floor(Math.random() * (AllStockHeadData.length));
                        const data = {
                            stock_id: AllStockHeadData[random].stock_id,
                            name: AllStockHeadData[random].name,
                            logoUrl: AllStockHeadData[random].logoUrl,
                            stockCost: AllStockHeadData[random].stockCost,
                            stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                        }

                        await newsOfStockModel.create(data);
                    }
                    // generate token

                    const payload = {
                        purpose: 'change data after 1m',
                        type: 'auth token'
                    }
                    stockNewsToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
                    console.log('token generated in stockInNews phase 2');

                } else {
                    console.log('token auth fail in stockInNews')
                    res.status(400).json({ msg: 'token auth fail in stockInNews', success: 'access denied' });
                    return;
                }
            }
            const stockInNewsData = await newsOfStockModel.find({});
            if(!stockInNewsData){
                res.status(404).json({ msg: 'Data not found', success: 'access denied' });
                return;
            }

            res.status(200).json(stockInNewsData);
        })
    } catch (error) {
        console.log('Internal server error on stockInNews')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }

}


const topLosers = async (req, res) => {
    console.log('we are in top loser');
    try {
        const Secret_Key = process.env.AUTH_SECRET_KEY;
        const isAlreadyData = await topLosersModel.find({});
        console.log('No data in topLosers : ',isAlreadyData.length===0);
        if (!topLoserToken || isAlreadyData.length===0) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                return;
            }

            for (let i = 1; i <= 4; i++) {
                const random = Math.floor(Math.random() * (AllStockHeadData.length));
                const data = {
                    stock_id: AllStockHeadData[random].stock_id,
                    name: AllStockHeadData[random].name,
                    logoUrl: AllStockHeadData[random].logoUrl,
                    stockCost: AllStockHeadData[random].stockCost,
                    stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                }

                await topLosersModel.create(data);
            }

            // generate jwt         

            const payload = {
                purpose: 'change data after 1m',
                type: 'auth token'
            }
            topLoserToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
            console.log('token generated in topLosers');
        }

        jwt.verify(topLoserToken, Secret_Key, async (err, decode) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    console.log('Token expires -- process of new data in topLosers');
                    const AllStockHeadData = await allStockHeadModel.find({});
                    if (!AllStockHeadData) {
                        res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                        return;
                    }
                    const deletePvrData = await topLosersModel.deleteMany({});

                    if (!deletePvrData) {
                        res.status(500).json({ msg: 'Error in deleting data in topLosers', success: 'access denied' });
                        return;
                    }

                    for (let i = 1; i <= 4; i++) {
                        const random = Math.floor(Math.random() * (AllStockHeadData.length));
                        const data = {
                            stock_id: AllStockHeadData[random].stock_id,
                            name: AllStockHeadData[random].name,
                            logoUrl: AllStockHeadData[random].logoUrl,
                            stockCost: AllStockHeadData[random].stockCost,
                            stockCostPerRate: AllStockHeadData[random].stockCostPerRate
                        }

                        await topLosersModel.create(data);
                    }
                    // generate token

                    const payload = {
                        purpose: 'change data after 1m',
                        type: 'auth token'
                    }
                    topLoserToken = jwt.sign(payload, Secret_Key, { expiresIn: '1m' });
                    console.log('token generated in topLosers phase 2');

                } else {
                    console.log('token auth fail in topLosers')
                    res.status(400).json({ msg: 'token auth fail in topLosers', success: 'access denied' });
                    return;
                }
            }
            const topLoserStockData = await topLosersModel.find({});
            if(!topLoserStockData){
                res.status(404).json({ msg: 'Data not found', success: 'access denied' });
                return;
            }

            res.status(200).json(topLoserStockData);
        })
    } catch (error) {
        console.log('Internal server error on topLosers')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }

}


module.exports = {mostBoughtOnGroww , topGainer , stockInNews , topLosers}
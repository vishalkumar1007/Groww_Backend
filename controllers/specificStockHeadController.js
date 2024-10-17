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

const getRandomStockData = async (AllStockHeadData, currentModel , length) => {
    const radomData = [];
    for (let i = 1; i <= length; i++) {
        const random = Math.floor(Math.random() * (AllStockHeadData.length));
        const data = {
            stock_id: AllStockHeadData[random].stock_id,
            name: AllStockHeadData[random].name,
            logoUrl: AllStockHeadData[random].logoUrl,
            stockCost: AllStockHeadData[random].stockCost,
            stockCostPerRate: AllStockHeadData[random].stockCostPerRate
        }
        radomData.push(data);
    }
    await currentModel.insertMany(radomData);
}

const generateToken = (Secret_Key, happenFn) => {
    const payload = {
        purpose: 'change data after 1m',
        type: 'auth token'
    }
    const tokenVariable = jwt.sign(payload, Secret_Key, { expiresIn: '5m' });
    console.log(`token generated in ${happenFn}`);
    return tokenVariable;
}

const mostBoughtOnGroww = async (req, res) => {
    try {
        const Secret_Key = process.env.AUTH_SECRET_KEY;

        if (!mostBoughtToken) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                return;
            }
            const msData = await mostBoughtModel.find({});
            if (msData.length > 0) {
                await mostBoughtModel.deleteMany({});
            }

            // save 4 random data
            await getRandomStockData(AllStockHeadData, mostBoughtModel , 4);

            // generate jwt         
            mostBoughtToken = generateToken(Secret_Key, 'mostBoughtOnGroww');

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

                    // save 4 random data
                    await getRandomStockData(AllStockHeadData, mostBoughtModel , 4);

                    // generate jwt         
                    mostBoughtToken = generateToken(Secret_Key, 'mostBoughtOnGroww');

                } else {
                    console.log('token auth fail in mostBoughtOnGroww');
                    res.status(400).json({ msg: 'token auth fail in mostBoughtOnGroww', success: 'access denied' });
                    return;
                }
            }
            const mostBoughtStockData = await mostBoughtModel.find({});
            if (!mostBoughtStockData) {
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

        if (!topGainerToken) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from AllStockHeadData', success: 'access denied' });
                return;
            }

            const msData = await topGainersModel.find({});
            if (msData.length > 0) {
                await topGainersModel.deleteMany({});
            }

            // save 4 random data
            await getRandomStockData(AllStockHeadData, topGainersModel , 12);

            // generate jwt         
            topGainerToken = generateToken(Secret_Key, 'topGainer');
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

                    // save 4 random data
                    await getRandomStockData(AllStockHeadData, topGainersModel , 12);

                    // generate jwt         
                    topGainerToken = generateToken(Secret_Key, 'topGainer');

                } else {
                    console.log('token auth fail in topGainer')
                    res.status(400).json({ msg: 'token auth fail in topGainer', success: 'access denied' });
                    return;
                }
            }
            const topGainerStockData = await topGainersModel.find({});
            if (!topGainerStockData) {
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

        if (!stockNewsToken) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                return;
            }

            const msData = await newsOfStockModel.find({});
            if (msData.length > 0) {
                await newsOfStockModel.deleteMany({});
            }

            // save 4 random data
            await getRandomStockData(AllStockHeadData, newsOfStockModel , 4);

            // generate jwt         
            stockNewsToken = generateToken(Secret_Key, 'stockInNews');
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

                    // save 4 random data
                    await getRandomStockData(AllStockHeadData, newsOfStockModel , 4);

                    // generate jwt         
                    stockNewsToken = generateToken(Secret_Key, 'stockInNews');

                } else {
                    console.log('token auth fail in stockInNews')
                    res.status(400).json({ msg: 'token auth fail in stockInNews', success: 'access denied' });
                    return;
                }
            }
            const stockInNewsData = await newsOfStockModel.find({});
            if (!stockInNewsData) {
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
    try {
        const Secret_Key = process.env.AUTH_SECRET_KEY;

        if (!topLoserToken) {
            // add new data into db of mostBought
            const AllStockHeadData = await allStockHeadModel.find({});
            if (!AllStockHeadData) {
                res.status(404).json({ msg: 'not getting data from allStockHeadModel', success: 'access denied' });
                return;
            }

            const msData = await topLosersModel.find({});
            if (msData.length > 0) {
                await topLosersModel.deleteMany({});
            }

            // save 4 random data
            await getRandomStockData(AllStockHeadData, topLosersModel , 12);

            // generate jwt         
            topLoserToken = generateToken(Secret_Key, 'topLosers');
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

                    // save 4 random data
                    await getRandomStockData(AllStockHeadData, topLosersModel , 12);

                    // generate jwt         
                    topLoserToken = generateToken(Secret_Key, 'topLosers');

                } else {
                    console.log('token auth fail in topLosers')
                    res.status(400).json({ msg: 'token auth fail in topLosers', success: 'access denied' });
                    return;
                }
            }
            const topLoserStockData = await topLosersModel.find({});
            if (!topLoserStockData) {
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


module.exports = { mostBoughtOnGroww, topGainer, stockInNews, topLosers }
const userVisitRecordModel = require('../models/userVisitRecordModel');

const handelToRecordUserVisit = async (req, res) => {

    try {
        const secretKeyAuth = req.headers.secretkeyauth;
        console.log(secretKeyAuth);
        if(!secretKeyAuth){
            res.status(401).json({ msg: 'secretKeyAuth requires', success: 'access denied' });
            return;
        }
        
        if(secretKeyAuth !== 'authActivityNewVisit07'){
            res.status(401).json({ msg: 'incorrect auth key', success: 'access denied' });
            return;
        }

        const RangeCharacter = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let UserRecordCode = '';
        for (let i = 0; i < 15; i++) {
            const randomNumber = Math.floor(Math.random() * (RangeCharacter.length - 1));
            UserRecordCode += RangeCharacter[randomNumber];
        }

        const increment_unique_id = process.env.increment_unique_id;

        userVisitRecordModel.findOneAndUpdate(
            { increment_unique_id: increment_unique_id },
            { $inc: { visitCount: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
            .then(updateRecord => {
                res.status(200).json({ msg: 'visitor api', success: 'access granted', existenceKey: UserRecordCode });
            })
            .catch(err => {
                console.log('error while update user count', err);
                res.status(500).json({ msg: 'mongo error', success: 'access denied' });
                return;
            })

    } catch (error) {
        console.log('server error ', error);
        res.status(500).json({ msg: 'server error', success: 'access denied' })
    }
}

const getVisitorNumber = async (req,res) =>{
    try {
        const data = await userVisitRecordModel.find();
        if(!data){
            res.status(404).json({msg:'data not found'});
            return;
        }
        
        res.status(200).json({visitorCountNumber:data[0].visitCount});
    } catch (error) {
        console.log('server error in getVisitor');
        res.status(500).json({msg:'Server error', success:'access denied'});
    }
}


module.exports = { handelToRecordUserVisit , getVisitorNumber}
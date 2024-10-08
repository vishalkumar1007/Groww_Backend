const userVisitRecordModel = require('../models/userVisitRecordModel');

const handelToRecordUserVisit = async (req, res) => {
    try {
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

module.exports = { handelToRecordUserVisit }
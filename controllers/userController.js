const userModel = require('../models/userModel')

const handelUserSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(firstName && lastName && email && password)) {
            res.status(401).json({ msg: 'all field must be require {firstName , lastName , email , password}', status: 'access denied' });
            return;
        }
        const checkForUserAlreadyExist = await userModel.findOne({ email });
        if (checkForUserAlreadyExist) {
            res.status(409).json({ msg: 'user already exist', status: 'access denied' });
            return;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password,
        }

        userModel.create(newUser)
            .then((user) => {
                if (user) {
                    console.log('New user registered');
                    res.status(201).json({ msg: 'user registered successfully', status: 'access granted' });
                } else {
                    console.log('something error while registered user');
                    res.status(400).json({ msg: 'error while registering user', status: 'access denied' });
                }
            }).catch((err) => {
                console.log('Internal server error on handelUserSignUp create', err)
                res.status(500).json({ msg: 'Internal server error on create', status: 'access denied' });

            })
    } catch (error) {
        console.log('Internal server error on handelUserSignUp')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

const handelToVerifyUserEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            console.log('email must be required');
            res.status(401).json({ msg: 'email must be require from body json to find user', status: 'access denied' });
            return;
        }

        const isValidUser = await userModel.findOne({ email });

        if (isValidUser) {
            console.log('req email validation success with exist');
            res.status(200).json({ msg: 'user exist in database', status: 'access granted' });
        } else {
            console.log('req email invalid not exist');
            res.status(404).json({ msg: 'user not found', status: 'access denied' });
        }
    } catch (error) {
        console.log('Internal server error on handelToVerifyUserEmail')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

const handelToUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            console.log('email and password must be required');
            res.status(401).json({ msg: 'email and password must be require from body json', status: 'access denied' });
            return;
        }
        const userData = await userModel.findOne({ email });

        if(!userData){
            console.log('user not exist');
            res.status(404).json({ msg: 'user not found', status: 'access denied' });
            return
        }

        if(userData.password===password && userData.email===email){
            console.log('Password matched');
            res.status(200).json({ msg: 'email or password matched', status: 'access granted' })
        }else{
            console.log('Password wrong');
            res.status(400).json({ msg: 'email or password wrong', status: 'access denied' });
        }
    } catch (error) {
        console.log('Internal server error on handelToUserLogin')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}


module.exports = {
    handelUserSignUp,
    handelToVerifyUserEmail,
    handelToUserLogin
}
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Handel User Signup
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

        

        const generateColorCode = () =>{
            let colorCode = '#';
            const hexCode = (number) => { return number.toString(16).padStart(2, '0') };
            for(let i=1; i<=3 ; i++){
                const code = hexCode(Math.trunc(Math.random()*195));
                colorCode += `${code}`;
            }
            return colorCode;
        }

        const colorCode = generateColorCode();

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            colorCode
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

// Handel User Verify using email id
const handelToVerifyUserEmail = async (req, res) => {
    try {
        const { email } = req.query;

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

// Handel User Login
const handelToUserLogin = async (req, res) => {

    try {
        const { email, password } = req.query;
        if (!(email && password)) {
            console.log('email and password must be required');
            res.status(401).json({ msg: 'email and password must be require from body json', status: 'access denied' });
            return;
        }
        const userData = await userModel.findOne({ email });

        if (!userData) {
            console.log('user not exist');
            res.status(404).json({ msg: 'user not found', status: 'access denied' });
            return;
        }

        if (userData.password === password && userData.email === email) {

            console.log('Password matched');

            const payLoad = {
                userId : userData._id,
                userFirstName : userData.firstName,
                userLastName: userData.lastName,
                userEmail : userData.email,
                userColorCode : userData.colorCode
            }

            const Secret_Key = process.env.AUTH_SECRET_KEY;

            const token = jwt.sign(payLoad,Secret_Key,{expiresIn:'1h'});
            res.status(200).json({ msg: 'email or password matched', status: 'access granted', token , payLoad});

        } else {
            console.log('Password wrong');
            res.status(400).json({ msg: 'email or password wrong', status: 'access denied' });
        }
    } catch (error) {
        console.log('Internal server error on handelToUserLogin')
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

// Handel User forgot password
const handelToUserForgotPassword = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            console.log('email must be required');
            res.status(401).json({ msg: 'email must be require from params', status: 'access denied' });
            return;
        }
        const validUser = await userModel.findOne({ email });
        if (!validUser) {
            console.log('user not valid');
            res.status(404).json({ msg: 'user not valid', status: 'access denied' });
            return;
        }

        
        const requestToDeleteOtpFromDB = async (email) => {
            try {
                const result = await otpModel.findOneAndDelete({ email });

                if (result) {
                    console.log('OTP deleted successfully from DB');
                    return true;
                } else {
                    console.log('No OTP found to delete');
                    return false;
                }
            } catch (error) {
                console.log('Error deleting OTP from DB:', error);
                return false;
            }
        }

        const checkUserOnOtp = await otpModel.findOne({email});
        if(checkUserOnOtp){
            console.log("user already exist in db , it not deleted after 2 min , try to delete ... , send request after 2 min");
            
            setTimeout(async () => {
                const isOtpDeleted = await requestToDeleteOtpFromDB(email);
                
                if (isOtpDeleted) {
                    console.log(`QUEUE OPERATION SUCCESSFUL DELETE OTP OF USER: ${email}`);
                } else {
                    console.log(`QUEUE OPERATION USER: ${email} OTP DELETE UNSUCCESSFUL`);
                }
            }, 120_000);
            
            res.status(400).json({msg:"otp is still valid now , add in queue to delete ... , send it after 2 min" ,  status:"access denied"});
            return;
        }


        const generateOtp = async (length) => {
            let getOtp = '';
            for (let i = 1; i <= length; i++) {
                let N_otp = parseInt(Math.random() * 10);
                N_otp = N_otp === 0 ? N_otp + 1 : N_otp;
                getOtp += N_otp.toString();
            }
            return getOtp;
        }

        const otp = await generateOtp(5);

        const saveOtpInDb = async () => {
            try {
                const otpDataBase = {
                    email,
                    otp
                }

                const result = await otpModel.create(otpDataBase);

                if (result) {
                    console.log('OTP successfully save in db');
                    return true;
                } else {
                    console.log('server err Otp not saved in db')
                    return false;
                }

            } catch (error) {
                console.log('From Catch : Error while saving otp in DB , check for duplicate');
                return false;
            }
        }

        const sendEmailToUser = async (email, otp) => {

            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.OFFICIAL_EMAIL,
                        pass: process.env.OFFICIAL_EMAIL_PASSWORD,
                    }
                });

                // Set up the mail options
                const mailOptions = {
                    from: 'vishal.kumar.17.official@gmail.com',
                    to: email,
                    subject: `OTP from Groww by vishalkumar07.me`,
                    html: OtpMailFormatHtml(otp),
                };

                // Send the email
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully.');
                return true;

            } catch (error) {
                console.log('Error while sending OTP email:', error);
                return false; // Return false if email fails to send
            }
        }


        if (!otp) {
            return res.status(500).json({ msg: 'Server Error on OTP', status: 'access denied' });
        }

        if (!await saveOtpInDb()) {
            return res.status(500).json({ msg: 'Server Error on saving Otp in DB', status: 'access denied' });
        }

        // Schedule OTP deletion after 2 minutes
        setTimeout(async () => {
            const isOtpDeleted = await requestToDeleteOtpFromDB(email);

            if (isOtpDeleted) {
                console.log(`SUCCESSFUL DELETE OTP OF USER: ${email}`);
            } else {
                console.log(`USER: ${email} OTP DELETE UNSUCCESSFUL`);
            }
        }, 120_000);


        if (! await sendEmailToUser(email, otp)) {
            return res.status(500).json({ msg: 'Server Error while sending email to user', status: 'access denied' });
        }

        res.status(200).json({ msg: 'Successfully sent email to user', status: 'access granted' });

    } catch (error) {
        console.log('Internal server error on handelToUserForgetPassword');
        res.status(500).json({ msg: 'Internal server error', status: 'access denied' });
    }
}

// Handel Verify OTP 
const handelVerificationOtpForForgot = async (req,res)=>{
    try{
        const {email,otp} = req.query;

        if(!(email && otp)){
            console.log('email and otp must be require ');
            res.status(401).json({msg:`email and otp must be require`, status:"access denied"});
            return;
        }

        const isValidEmail = await otpModel.findOne({email});
        if(!isValidEmail){
            console.log('Not found any otp with this id ', email);
            res.status(404).json({msg:`We not found any otp with ${email} id`, status:"access denied"});
            return ;
        }

        if(isValidEmail.otp === otp){
            console.log(`OTP verification Successful`);
            res.status(200).json({msg:'OTP verification successful ' , status:"access granted"});
            return;
        }

        console.log(`OTP verification fail , Wrong OTP`);
        res.status(403).json({msg:'OTP verification fail , Wrong OTP' , status:"access denied"});

    }catch(err){
        console.log("Internal Server Error on Otp verification");
        res.status(500).json({msg:'Internal server error', status:"access denied"});
    }
}


// Handel Update Password

const handelToUpdatePassword = async (req,res)=>{
    try {
        const {email,password} = req.body;
        
        if(!(email,password)){
            console.log('email and password required');
            res.status(401).json({msg:'email and pass required ', status:"access denied"});
            return;
        }
        const updateData = await userModel.findOneAndUpdate({email} , {password});

        if(updateData){
            console.log('Password update successful');
            res.status(200).json({msg:'user password update successful', status:'access granted'});
            return;
        }
        console.log('user not found with email');
        res.status(404).json({msg:'user not found', status:'access denied'});

    } catch (error) {
        console.log('Internal server error');
        res.status(500).json({msg:'Internal server Error' , status:'access denied'});
    }
}

// Handel Verify JWT Token

const handelToVerifyToken = (req,res)=>{
    try {
        const authHeaderToken = req.headers.authorization;
        if(!authHeaderToken){
            console.log('auth token require');
            res.status(401).json({msg:'auth token require ', status:"access denied"});
            return;
        }
        const token = authHeaderToken.split(' ')[1];
        const Secret_Key = process.env.AUTH_SECRET_KEY;

        jwt.verify(token, Secret_Key, (error,decode)=>{
            if(error){
                if(error.name === 'TokenExpiredError'){
                    console.log('token expired login');
                    res.status(401).json({ msg: 'Token Expired', status: 'access denied' });
                }else{
                    console.log('token authentication failed');
                    res.status(401).json({ msg: 'Token verify fail', status: 'access denied'});
                }
                return ;
            }
            console.log('token verify successful');
            res.status(200).json({msg:'token verify successful' , status:'access granted' , decode});
        })
        
    } catch (error) {
        console.log('Internal server error');
        res.status(500).json({msg:'Internal server Error' , status:'access denied'});
    }
}


// html format for mail
const OtpMailFormatHtml = (otp) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email from Groww by Vishalkumar</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #1b1a1a;
                    margin-top: 60px;
                }

                .container {
                    width: 90%;
                    max-width: 600px;
                    margin: auto auto;
                    background-color: #ffffff;
                    border: 2px solid #c5c5c58a;
                    box-shadow: 0 0 15px #bfbfbfae;
                    color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    padding: 10px 0px;
                }

                .header_x {
                    color: #242222;
                    text-align: center;
                }

                .header_x h2 {
                    font-size: 27px;
                    font-weight: bold;
                    color: #595759;
                }

                .header_x p a {
                    color: #6e696969;
                    text-align: center;

                }

                .header_title {
                    font-size: 13px;
                    color: #6e696969;
                }

                .content {
                    text-align: center;
                    padding: 10px 40px;
                    color: #dcdcdc;
                }

                .content p {
                    color: #5b5a5c;
                    font-size: 16px;
                    line-height: 1.5;
                }

                .content h1 {
                    color: #2ea89e;
                }

                .footer {
                    text-align: center;
                    padding: 10px 0px 5px 0px;
                    font-size: 12px;
                    color: #7b7a7a;
                }

                #xht {
                    font-size: 19px;
                }

                #xht2 {
                    font-size: 13px;
                    color: rgb(192, 45, 31);
                }

                #xht3 {
                    font-size: 12px;
                    color: rgb(112, 114, 114);
                }
                
                #xht3 a {
                    font-size: 12px;
                    color: rgb(62, 156, 167);
                }
            </style>
        </head>

        <body>
            <div class="container">
                <div class="header_x">
                    <h2>Groww</h2>
                    <p class="header_title"><a href="https://vishalkumar07.me">by vishalkumar07.me</a></p>
                </div>
                <div class="content">
                    <p id="xht">
                        One-Time Verification Code
                    </p>
                    <h1>${otp}</h1>
                    <p id="xht2">Note : This code is only valid for next 2 minutes</p>
                    <p id="xht3">Trouble in OTP validation ? <a href="https://vishalkumar07.me">report</a></p>
                </div>
                <div class="footer">
                    &copy; 2024 vishalkumar07. All rights reserved.
                </div>
            </div>
        </body>

        </html>
    `
}



module.exports = {
    handelUserSignUp,
    handelToVerifyUserEmail,
    handelToUserLogin,
    handelToUserForgotPassword,
    handelVerificationOtpForForgot,
    handelToUpdatePassword,
    handelToVerifyToken
}
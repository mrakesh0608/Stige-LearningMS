const {User} = require('../model/User');
const jwt = require('jsonwebtoken');

const {courseInitiator} = require('../controllers/courseInitiator')
const {handleErrors} = require('./handleErrors')

//JWT-Start
const maxAge= 3*24*60*60;//in 3Days in Seconds
function createToken(id){
    return jwt.sign( {id}, 'secretKey',{expiresIn:maxAge} );
}
//JWT-Ends

//GET-REQUESTS-Starts
module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwtKaCookie','',{maxAge:1});
    res.redirect('/');
}
//GET-REQUESTS-Ends

//POST-REQUESTS-Starts
module.exports.signup_post = async (req,res)=>{
    const {fullname,email,password, mobileNo,address,imageType,imageData} = req.body

    try{
        let user;
        if(imageType){
            user = await User.create({fullname,email,password,mobileNo,address,
                userImg: {
                    data: imageData,
                    contentType: imageType
                }}
            );
        }else{
            user = await User.create({fullname,email,password,mobileNo,address});
        }
        
        //add default courses to new user
        console.log("\nNew User: "+email);
        courseInitiator(email);

        res.status(200).json({user:user._id});
    }
    catch (err){
        const errors = await handleErrors(err);
        console.log(errors);
        res.status(400).json( {errors} );
    }
}

module.exports.login_post = async (req,res)=>{
    const {email,password} = req.body;
    // console.log(email,password);
    // res.send('new login');
    try {
        const user= await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwtKaCookie', token, {httpOnly:true,maxAge:maxAge*1000})

        res.status(200).json({user:user._id});
    }catch (err) {
        const errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});
    }
}
//POST-REQUESTS-Ends
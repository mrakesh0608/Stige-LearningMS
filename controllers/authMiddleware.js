const jwt = require('jsonwebtoken');
const {User} = require('../model/User');

//Checks frontend as valid cookie or not
module.exports.verifyAuth = (req,res, next)=>{
    
    const token = req.cookies.jwtKaCookie;
    
    if(token){
        jwt.verify(token,'secretKey',(err,decodedToken)=>{
            if(err){ //not valid
                console.log(err);
                redirect('/login');
            }
            else{ //valid
                // console.log(decodedToken);
            }
        })
    }
    else res.redirect('/login');
    next(); 
}

//Check Current User
module.exports.CheckUser = (req,res, next)=>{
    
    const token = req.cookies.jwtKaCookie;
    
    if(token){
        jwt.verify(token,'secretKey',async (err,decodedToken)=>{
            if(err){ //not logged in
                console.log(err);
                res.locals.user = null;
                next();
            }
            else{ //user logged in
                
                // console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                console.log("\nCurrent User Email: "+user.email+"\n");
                res.locals.user = user;
                next();//carry on next middleware
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}
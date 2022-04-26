const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json({limit: '3mb'}));
app.listen(process.env.PORT || 3000);
//Cookie-Start
const cookieParser = require('cookie-parser');
app.use(cookieParser()); //to access from res object
//Cookie-Ends

//DB-Connection-Start
const dbURI = "mongodb+srv://mrakesh0608:mydb123@cluster0.u0jcl.mongodb.net/LMS?retryWrites=true&w=majority";

mongoose.connect( process.env.MONGODB_URI,{})
.then( (result) => {
    console.log("\nDB Connected");
    
    console.log("Server Started");
})
.catch( (err)=> console.log(err));
//DB-Connection-Ends

//Apply on all routes allow only if user logged in
const authMiddleware = require('./controllers/authMiddleware');
app.get('*',authMiddleware.CheckUser)
app.post('*',authMiddleware.CheckUser)
//Ends

//auth-Routes-start
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
//auth-Routes-End

//user-Routes-start
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);
//user-Routes-End
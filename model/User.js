const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: [true,'Please enter name']
    },
    email:{
        type:String,
        required: [true,'Please enter email'],
        unique:true,
        lowercase:true,
        validate:[ isEmail ,'Please enter valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[6,'minimul password lenth is 6 chars']
    },
    mobileNo:{
        type:String,
        required:[true,'Please enter your mobile no'],
        minlength:[10,'lenth is 10 numbers']
    },
    address:{
        type:String
    },
    userImg:{
        data: String,
        contentType: String
    }
});

//fire a function before doc saved to db(Hook)
userSchema.pre('save',async function(next){
    // console.log("user to be created & saved",this);
    
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);

    next();
})

//static method to login user
userSchema.statics.login = async function(email,password){
    const user = await this.findOne( {email} );
    if(user){
        //not-hashed-from-front-end,hashed-from-db
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect Password');
    }
    throw Error('incorrect Email');
}

module.exports.User = mongoose.model('user',userSchema);
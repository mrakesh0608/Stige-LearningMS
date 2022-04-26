//Handling-Errors-Start
function handleErrors(err){
    
    console.log(err.message,err.code);
    // console.log(err.message, err.code);
    const errors = {fullname:'',email:'',password:'',mobileNo:''};

    if(err.message === 'incorrect Email'){
        errors.email = err.message;
    }
    if(err.message === 'incorrect Password'){
        errors.password = err.message;
    }
    if(err.code === 11000){
        errors.email = "email already used";
        return errors;
    }
    
    if(err.message.includes('users validation failed')){
        Object.values(err.errors).forEach( ({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
//Handling-Errors-End

module.exports = {handleErrors};
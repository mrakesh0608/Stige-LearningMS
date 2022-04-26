const form = document.querySelector('form');

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
        resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const fullname = form.fullname.value;
    const email = form.email.value;
    const password = form.password.value;
    const mobileNo = form.mobileNo.value;
    const address = form.address.value;

    //storing img
    const inpFile = document.getElementById('userImg');
    const val = inpFile.files[0];
    console.log(val);
    let imageType,imageData
    if(val){
        imageType = val.type;
        imageData = await convertBase64(val);
    }
    // console.log(imageType,imageData);

    try{
        const user = JSON.stringify({fullname,email,password,mobileNo,address,imageType,imageData});

        const res = await fetch('/signup',{
            method:'POST',
            body: user,
            headers: {'Content-Type':'application/json'}
        });
        
        const result = await res.json();
        console.log(result);
        if(result.errors){
            if(result.errors.fullname !== ''){
                form.fullname.setCustomValidity(result.errors.fullname);
                form.fullname.reportValidity();
            }
            if(result.errors.email !== ''){
                form.email.setCustomValidity(result.errors.email);
                form.email.reportValidity();
            }
            if(result.errors.password != ''){
                form.password.setCustomValidity(result.errors.password);
                form.password.reportValidity();
            }
            if(result.errors.mobileNo != ''){
                form.mobileNo.setCustomValidity(result.errors.mobileNo);
                form.mobileNo.reportValidity();
            }
            setTimeout(()=>{
                form.fullname.setCustomValidity('');
                form.email.setCustomValidity('');
                form.password.setCustomValidity('');
                form.mobileNo.setCustomValidity('');
            },4000);
        }
        else if(result.user) location.assign('/login')
        else console.log(result);
    } 
    catch (err){ console.log(err)}
})
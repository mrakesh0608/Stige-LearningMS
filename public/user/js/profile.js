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
        const user = JSON.stringify({fullname,email,mobileNo,address,imageType,imageData});

        const res = await fetch('/profile',{
            method:'POST',
            body: user,
            headers: {'Content-Type':'application/json'}
        });
        
        const result = await res.json();
        if(result.updated){
            location.reload();
        }
        else{
            console.log(result);
        }
    } 
    catch (err){
        console.log(err);
    }
})
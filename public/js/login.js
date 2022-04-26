const form = document.querySelector('form');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;
    // console.log(email,password);
    try{
        const res = await fetch('/login',{
            method:'POST',
            body: JSON.stringify({ email,password}),
            headers: {'Content-Type':'application/json'}
        });
        let data = await res.json();
        if(data.errors){
            if(data.errors.email != ''){
                form.email.setCustomValidity(data.errors.email);
                form.email.reportValidity();
            }
            if(data.errors.password != ''){
                form.password.setCustomValidity(data.errors.password);
                form.password.reportValidity();
            }
            setTimeout(()=>{
                form.email.setCustomValidity('');
                form.password.setCustomValidity('');
            },4000);
        }
        if(data.user){
            location.assign('/dashboard');
        }
        
    } 
    catch (err){}
})
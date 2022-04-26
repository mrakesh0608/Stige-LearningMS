let courseBtn = document.getElementsByClassName('courses-li-btn');
let coursedetails = document.getElementsByClassName('courses-li-details');
coursedetails =Array.from(coursedetails)
for(let i=0;i<courseBtn.length; i++)
{   
    courseBtn[i].addEventListener('click',(e)=>{
        if(coursedetails[i].style.display === 'block'){
            coursedetails[i].style.display = 'none';
            courseBtn[i].style.transform = 'rotateZ(0deg)'
        }
        else{
            coursedetails[i].style.display = 'block';
            courseBtn[i].style.transform = 'rotateZ(180deg)' 
        }
    })
}

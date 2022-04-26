const markAsCompleteBtn = document.getElementById('markAsCompleteBtn');

markAsCompleteBtn.addEventListener('click',async (e)=>{
    console.log('completed');

    try{
        const course = document.getElementsByClassName('task-head');
        // console.log(course[0].id);
        // console.log(course[0].firstElementChild.id);
        const courseID = course[0].id;
        const courseTaskName = course[0].firstElementChild.id;

        const data = JSON.stringify({courseID,courseTaskName});

        const res = await fetch('/courses',{
            method:'POST',
            body: data,
            headers: {'Content-Type':'application/json'}
        });
        const result = await res.json();
        if(result.updated){
            console.log(result);
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
// console.log(tasksComp);
// console.log(tasksNComp);
//Create Task-Starts
document.getElementById('create-task').addEventListener('click',()=>{
    document.getElementById('new-task').style.display = 'flex';
});

document.getElementById('cancel-new-task').addEventListener('click',()=>{
    document.getElementById('new-task').style.display = 'none';
});

const form = document.querySelector('#new-task form');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const desc = form.desc.value;
    const deadline = form.deadline.value;
    const completed = form.completed.value;
    console.log(desc,deadline,completed);
    try{
        const res = await fetch('/your-tasks',{
            method:'POST',
            body: JSON.stringify({ userEmail,operation:'newTask',desc,deadline,completed }),
            headers: {'Content-Type':'application/json'}
        });
        if(res){
            console.log(res.json());
            location.reload();
        }
        else{
            console.log(res);
        }
    } 
    catch (err){console.log(err)}
})

//Create-Task-Ends
//Update-Task-Starts
const formU = document.querySelector('#update-task form');

document.getElementById('cancel-update-task').addEventListener('click',()=>{
    document.getElementById('update-task').style.display = 'none';
});

let updateID;
let updateTask = document.getElementsByClassName('btn-update');
for(i=0;i<updateTask.length; i++)
{   
    updateTask[i].addEventListener('click',async (e)=>{
        document.getElementById('update-task').style.display = 'flex';
        
        const li = e.target.closest('li');
        const taskID = li.id;
        updateID = taskID;
        try{
            const res = await fetch('/your-tasks',{
                method:'POST',
                body: JSON.stringify({ taskID,operation:'getTask'}),
                headers: {'Content-Type':'application/json'}
            });
            const data = await res.json();
            if(data.task){
                console.log(data.task);
                formU.desc.value = data.task.desc;
                formU.deadline.value = data.task.deadline;
                formU.completed.value = data.task.completed;
            }
            else{
                console.log(res);
            }
        } 
        catch (err){console.log(err)}

    })
}

formU.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const desc = formU.desc.value;
    const deadline = formU.deadline.value;
    const completed = formU.completed.value;
    console.log(desc,deadline,completed);

    
    const taskID = updateID;
    try{
        const res = await fetch('/your-tasks',{
            method:'POST',
            body: JSON.stringify({ taskID,operation:'updateTask',desc,deadline,completed}),
            headers: {'Content-Type':'application/json'}
        });
        const data = await res.json();
        if(data.updated){
            location.reload();
        }
        else{
            console.log(data);
        }
    } 
    catch (err){}
})

//Update-Task-Ends
//Delete Task
let deleteTask = document.getElementsByClassName('btn-delete');
for(i=0;i<deleteTask.length; i++)
{   
    deleteTask[i].addEventListener('click',async (e)=>{
        if(confirm('Are You Sure?'))
        {
            const li = e.target.closest('li');
            const taskID = li.id;
            
            try{
                const res = await fetch('/your-tasks',{
                    method:'POST',
                    body: JSON.stringify({ taskID,operation:'deleteTask'}),
                    headers: {'Content-Type':'application/json'}
                });
                const data = await res.json();
                if(data.deleted){
                    location.reload();
                }
                else{
                    console.log(data);
                }
            } 
            catch (err){console.log(err)}

        }
    })
}
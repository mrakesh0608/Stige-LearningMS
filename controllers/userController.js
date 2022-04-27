const {Task} = require('../model/Task');
const {User} = require('../model/User');
const {Course} = require('../model/Course');

const {handleErrors} = require('./handleErrors')

module.exports.updateProfile = async (req,res)=>{
    // console.log(req.body);
    const {fullname,email,mobileNo,address,imageType,imageData} = req.body

    try {
        if(imageType){
            const user = await User.findOneAndUpdate( {email} , {fullname,mobileNo,address,
                userImg: {
                    data: imageData,
                    contentType: imageType
                }
            });
            res.status(200).json( {updated:true} );
        }
        else{
            const user = await User.findOneAndUpdate( {email} , {fullname,mobileNo,address} );
            // console.log(user);
            res.status(200).json( {updated:true} );
        }
        console.log("Profile Updated");
    }
    catch (err){
        const errors = await handleErrors(err);
        console.log(errors);
        res.status(400).json( {errors} );
    }
}

module.exports.getYourTasks = async (req,res)=>{

    res.locals.currentPage = 'Your Tasks';
    const email = res.locals.user.email
    let tasksComp = await Task.find({email,completed: 'Mark as Completed'});
    let tasksNComp = await Task.find({email,completed: 'Mark as Not Completed'});
    res.locals.tasksComp = tasksComp;
    res.locals.tasksNComp = tasksNComp;
    res.render('user/your-tasks');
}

module.exports.taskManager = async (req,res)=>{
    const {operation} = req.body;

    try {
        if(operation === 'newTask'){
            const {userEmail,operation,desc,deadline,completed} = req.body;
            console.log(userEmail,operation,desc,deadline,completed);
            
            const task = await Task.create({userEmail,desc,deadline,completed});
            // console.log(task);
            res.status(200).json({task});
        }
        else if(operation === 'getTask'){
            const {taskID} = req.body;
            // console.log(taskID);
            
            const task = await Task.findById(taskID);
            // console.log(task);
            res.status(200).json( {task} );
        }
        else if(operation === 'deleteTask'){
            const {taskID} = req.body;
            // console.log(taskID);
            
            const task = await Task.findByIdAndRemove(taskID);
            // console.log(task);
            res.status(200).json( {deleted:true} );
        }
        else if(operation === 'updateTask'){
            const {taskID,desc,deadline,completed} = req.body;
            console.log(taskID,desc,deadline,completed);
            
            // console.log(taskID);
            const task = await Task.findByIdAndUpdate({_id:taskID},{desc,deadline,completed});
            // console.log(task);
            res.status(200).json( {updated:true} );
        }
        else res.status(400).json( {error:'invalid operation'} );
    }
    catch (err) {
        console.log(err);
        res.status(400).json( {err} );
    }
}

//Courses-Modules-Start
module.exports.getYourCoursesDashboard = async (req,res)=>{

    const email = res.locals.user.email
    const courses = await Course.find({email})
    // res.locals.courses = courses;
    // console.log(courses);

    const noOfCourses = courses.length;
    let coursesCompleted = 0;
    for(i=0; i<noOfCourses;i++){
        // console.log(courses[i].completed)
        if(courses[i].completed){
            coursesCompleted++;
        }
    }
    console.log(noOfCourses,coursesCompleted);
    res.locals.coursesDashboard = {noOfCourses,coursesCompleted};

    res.locals.currentPage = 'Dashboard';
    res.render('user/dashboard');
}

module.exports.getYourCourses = async (req,res)=>{

    const email = res.locals.user.email
    const courses = await Course.find({email})
    res.locals.courses = courses;
    // console.log(courses);
    // console.log(courses[0].tasks);

    res.locals.currentPage = 'Your Courses';
    res.render('user/courses');
}

module.exports.getYourCoursesTask = async (req,res)=>{

    const path = req.params.courseName+'/'+req.params[0];
    const email = res.locals.user.email;

    const courses = await Course.find({email})
    res.locals.courses = courses;

    Array.from(courses).forEach( (key)=>{
        Object.keys(key.tasks).forEach( (task)=>{
            if(path === key.tasks[task].path){
                // console.log(key._id);
                // console.log(key.course);
                // console.log(task);
                // console.log(key.tasks[task].path);
                res.locals.courseTask = { 
                    _id:key._id,
                    courseName:key.course,
                    courseTaskName:task,
                    path:'courses/'+ path,
                    completed:key.tasks[task].completed
                }
            }   
        })
    })

    // console.log(res.locals.courseTask);
    res.locals.currentPage = 'Your Course Task';
    // res.locals.courseTask = 'courses/'+ path;
    res.render('user/courses-task');
}

module.exports.updateYourCoursesTask = async (req,res)=>{
    console.log(req.body);
    const email = res.locals.user.email;
    const {courseID,courseTaskName} = req.body;

    try {
        let field = "tasks."+courseTaskName+".completed";
        
        const course = await Course.findOneAndUpdate( {_id:courseID,email} , {[field]:true});
        
        // console.log(course);
        
        //if all tasks completed do this-start
        const courseUP = await Course.find( {_id:courseID,email});
        // console.log(courseUP[0].tasks);

        let noOfTasksCompleted = 0;
        Object.keys(courseUP[0].tasks).forEach( (task)=>{
            if(courseUP[0].tasks[task].completed){
                noOfTasksCompleted++;
            }
        })
        if(noOfTasksCompleted === (Object.keys(courseUP[0].tasks).length))
        {
            const courseUP2 = await Course.findOneAndUpdate( {_id:courseID,email} , {completed:true});
            // console.log(courseUP2);
        }
        //if all tasks completed do this-ends

        res.status(200).json( {updated:true} );
        console.log("Task Updated");
    }
    catch (err){
        console.log(err);
        res.status(400).json( {err} );
    }
}
//Courses-Modules-Ends
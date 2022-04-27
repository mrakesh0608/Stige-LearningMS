const {Course} = require('../model/Course');

const courses = {
    "Pre-Course Work":{
        "Task 0: Welcome to the Program":{"completed":false,"path":"pcw/task0"},
        "Task 1: Know the Rules":{"completed":false,"path":"pcw/task1"},
        "Task 2: Setup Alarmy":{"completed":false,"path":"pcw/task2"}
    },

    "Software Development":{
        "Task 0: Setup Dev Environment":{"completed":false,"path":"sd/task0"},
        "Task 1: HTML Refresher":{"completed":false,"path":"sd/task1"},
        "Task 2: CSS Refresher":{"completed":false,"path":"sd/task2"},
        "Task 3: Mini Project":{"completed":false,"path":"sd/task3"}
    }
}

module.exports.courseInitiator = (email)=>{
    
    Object.keys(courses).forEach( async (courseName)=> {
            const course = await Course.create({
                email,
                course: courseName,
                completed: false,
                tasks: courses[courseName]
            })
            console.log("\nCourses are created for new user");
    });
}
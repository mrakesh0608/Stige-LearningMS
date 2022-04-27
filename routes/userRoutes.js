const express = require("express");

const authMiddleware = require('../controllers/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router(); //instance of router


//GET Requests-Start
router.get('/dashboard',authMiddleware.verifyAuth,userController.getYourCoursesDashboard)

router.get('/profile',authMiddleware.verifyAuth,(req,res)=>{
    res.locals.currentPage = 'Your Profile';
    res.render('user/profile');
})

router.get('/courses',authMiddleware.verifyAuth,userController.getYourCourses);

router.get('/courses/:courseName/*',authMiddleware.verifyAuth,userController.getYourCoursesTask);

router.get('/your-tasks',authMiddleware.verifyAuth,userController.getYourTasks)
//GET Requests-Ends


//POST Requests-Starts
router.post('/profile',authMiddleware.verifyAuth,userController.updateProfile)

router.post('/your-tasks',authMiddleware.verifyAuth,userController.taskManager)

router.post('/courses',authMiddleware.verifyAuth,userController.updateYourCoursesTask);
//POST Requests-Ends

module.exports = router;
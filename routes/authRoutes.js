const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

//GET Requests-Start
router.get('/',(req,res)=> {
    res.locals.currentPage = 'Home';
    res.render('home')
});

router.get('/login', authController.login_get);

router.get('/signup', authController.signup_get);

router.get('/logout', authController.logout_get);
//GET Requests-Ends

//POST Requests-Starts
router.post('/signup', authController.signup_post);

router.post('/login', authController.login_post);
//POST Requests-Ends

module.exports = router;
const router = require('express').Router();
const controller = require('../../controller/mainController')

// home page
router.get('/', controller.homePage);

// search
router.post('/search', controller.search);

// sign up page
router.get('/signup', controller.signupPage);

// log in page
router.get('/login', controller.loginPage);

// signup
router.post('/signup', controller.signup);

// login
router.post('/login', controller.login);

// log out
router.get('/logout', controller.logout);

module.exports = router;
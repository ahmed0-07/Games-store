const router = require('express').Router();
const controller = require('../../controller/adminController');

// admin home page
router.get('/', controller.authMiddleWare, controller.adminHomePage);

// remove game
router.post('/removegame/:id', controller.authMiddleWare, controller.removeGame);

// add game page
router.get('/addgame', controller.authMiddleWare, controller.addgamePage);

// add game
router.post('/addgame', controller.authMiddleWare, controller.addgame);

router.post('/search', controller.search);

module.exports = router;
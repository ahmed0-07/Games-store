const router = require('express').Router();
const controller = require('../../controller/userController');

// user home page
router.get('/', controller.authMiddleWare, controller.userHomePage)

// add to cart
router.post('/addtocart/:id', controller.authMiddleWare, controller.addtocart);

// remove from cart
router.post('/removefromcart/:id', controller.authMiddleWare, controller.removefromcart);

// cart
router.get('/cart', controller.authMiddleWare, controller.cart);

router.post('/thank-you', controller.prush);

router.post('/search', controller.search);

module.exports = router;
const express = require('express');

const cartController = require('../controllers/cart');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/cart', auth, cartController.getCart);

router.get('/ecart', auth, cartController.getECart);

router.post('/addtocart', auth, cartController.postAddToCart);

router.post('/removefromcart', auth, cartController.postRemoveFromCart);


module.exports = router;
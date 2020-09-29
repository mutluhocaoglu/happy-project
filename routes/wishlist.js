const express = require('express');

const wishlistController = require('../controllers/wishlist');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/wishlist', auth, wishlistController.getWishlist);

router.get('/ewishlist', auth, wishlistController.getEWishlist);

router.post('/addtowishlist', auth, wishlistController.postAddToWishlist);

router.post('/removefromwishlist', auth, wishlistController.postRemoveFromWishlist);


module.exports = router;
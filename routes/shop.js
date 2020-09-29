const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

// router.get('/products', shopController.getAllCategories);

// router.get('/womencat', shopController.getCategoryWomen);

// router.get('/mencat', shopController.getCategoryMen);

// router.get('/mens-clothing', shopController.getMenCloth);

// router.get('/mens-accessories', shopController.getMenAcce);

// router.get('/womens-accessories', shopController.getWomenAcce);

// router.get('/womens-clothing', shopController.getWomenCloth);

// router.get('/womens-jewelry', shopController.getWomenJew);

// router.get('/womens-clothing-tops', shopController.getProducts);

// router.get('/singleproduct', shopController.getSingleProduct);

module.exports = router;
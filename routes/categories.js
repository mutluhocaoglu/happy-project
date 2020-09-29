const path = require('path');

const express = require('express');

const categoryController = require('../controllers/categories');

const router = express.Router();

router.get('/', categoryController.getIndex);

router.get('/index/:categories', categoryController.getAllCategories);

router.get('/index/:categories/:subcategories', categoryController.getSubCategories);

router.get('/index/:categories/:subcategories/:products', categoryController.getProducts);

router.get('/index/:categories/:subcategories/:products/:id', categoryController.getProductId);



module.exports = router;
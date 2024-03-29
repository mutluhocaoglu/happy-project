const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

router.get('/order', orderController.getOrder);

module.exports = router;
const express = require('express');

const searchTController = require('../controllers/search');

const router = express.Router();

router.get('/search', searchTController.getSearchT);


module.exports = router;
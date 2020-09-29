const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/login', userController.getLogin);

router.get('/register', userController.getRegister);

router.post('/register', userController.postRegister);

router.post('/login', userController.postLogin);

router.get('/logout', userController.getLogout);


module.exports = router;
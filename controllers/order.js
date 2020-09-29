const axios = require('axios');

const baseUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const secKey = 'secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';

exports.getOrder = (req, res, next) => {
    res.render('order');
};
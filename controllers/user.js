const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//const bodyParser = require('body-parser');
const baseUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const secKey = 'secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
   


exports.getLogin = (req, res, next) => {
    res.render('login');
};

exports.getRegister = (req, res, next) => {
    res.render('register');
};

exports.postRegister = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    const user = {
        secretKey: '$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC',
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    };
    console.log(user);
    axios.post( baseUrl + 'auth/signup', user)
    .then((response) => {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    res.redirect('/login');
};

exports.postLogin = (req, res, next) => {
    const user = {
        secretKey: '$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC',
        email: req.body.email,
        password: req.body.password

    };
    axios.post( baseUrl + 'auth/signin', user)

.then((response) => {
     
     let token = response.data.token;
    console.log(response);
     
    localStorage.setItem('token', token);
    console.log(response.data.token);
     
})
.catch((error) => {
    console.log(error);
});

req.session.isLoggedIn = true;
 res.redirect('/')
};

exports.getLogout = (req, res, next) => {
    if (req.session) {
        
        localStorage.removeItem('token');
        // delete session object
        req.session.destroy((err) => {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
    };
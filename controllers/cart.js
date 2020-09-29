const axios = require('axios');
const { response } = require('express');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
  //console.log(token);

const baseUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const secKey = 'secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';


exports.getCart = (req, res, next) => {

    const token = localStorage.getItem('token');

    axios.get( baseUrl + 'cart?' + secKey, {
         headers: {"Authorization" :  'Bearer ' + token}
    })
    .then((response) => {
        //console.log(response.data.items);
        let prodsArray = [];
            let products=response.data.items;
            
               // prodsArray.push(products);
            //let abc=response.data.items.variant;
            console.log(products);
            
            res.render('cart', {
                products : products
                });
                

    })
    .catch((error) => {
        res.redirect('/ecart');
        console.log(error);
    });

    
};

exports.postAddToCart = (req, res, next) => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const variantId = localStorage.getItem('variantId');


    const product = {
        secretKey: '$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC',
        productId: id,
        variantId: variantId,
        quantity: 1
    };

    axios.post( baseUrl + 'cart/addItem' , product , {
         headers: {"Authorization" :  'Bearer ' + token}
    })
    .then((response) => {
        res.redirect('/cart');
        console.log(response);
    })
    .catch((error) => {
    
        console.log(error);
    });
};

exports.postRemoveFromCart = (req, res, next) => {

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const variantId = localStorage.getItem('variantId');

    const secretKey= '$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';
    

    axios({
        method:'delete',
        url: baseUrl + 'cart/removeItem',
        data:{
            secretKey: secretKey,
	        productId: id,
	        variantId: variantId,
        },
        headers: {"Authorization" :  'Bearer ' + token}
    })
    .then((response) => {
        res.redirect('/cart');
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });

    
};

exports.getECart = (req, res, next) => { 
    res.render('ecart');
};
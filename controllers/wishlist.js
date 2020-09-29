const axios = require('axios');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

const baseUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const secKey = 'secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';

exports.getWishlist = (req, res, next) => {

    const token = localStorage.getItem('token');

    axios.get( baseUrl + 'wishlist?' + secKey, {
         headers: {"Authorization" :  'Bearer ' + token}
    })
    .then((response) => {
        //console.log(response.data.items);
        let prodsArray = [];
            let products=response.data.items;
            
               // prodsArray.push(products);
            //let abc=response.data.items.variant;
            console.log(products);
            res.render('wishlist', {
                products : products
                });
    })
    .catch((error) => {
        res.redirect('/ewishlist');
        console.log(error);
    });

    
};

exports.postAddToWishlist = (req, res, next) => {
  const token = localStorage.getItem('token');
  const idw = localStorage.getItem('idw');
  const variantIdw = localStorage.getItem('variantIdw');


    const product = {
        secretKey: '$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC',
        productId: idw,
        variantId: variantIdw,
        quantity: 1
    };

    axios.post( baseUrl + 'wishlist/addItem' , product , {
         headers: {"Authorization" :  'Bearer ' + token}
    })
    .then((response) => {
        res.redirect('/wishlist');
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });

    
};

exports.postRemoveFromWishlist = (req, res, next) => {

    const token = localStorage.getItem('token');
    const idw = localStorage.getItem('idw');
    const variantIdw = localStorage.getItem('variantIdw');

    
      const secretKey= '$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';
      const productId= idw;
      const variantId= variantIdw;
    

    axios({
        method:'delete',
        url: baseUrl + 'wishlist/removeItem',
        data:{
            secretKey: secretKey,
	        productId: productId,
	        variantId: variantId,
        },
        headers: {"Authorization" :  'Bearer ' + token}
    })
    .then((response) => {
        res.redirect('/wishlist');
        console.log(response);
    })
    .catch((error) => {
        
        console.log(error);
    });
    
};

exports.getEWishlist = (req, res, next) => { 
    res.render('ewishlist');
};
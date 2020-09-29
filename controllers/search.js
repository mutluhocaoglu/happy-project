const axios = require('axios');
const { response } = require('express');

const baseUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const secKey = 'secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';


exports.getSearchT = (req, res, next) => {
    const categories = req.params.categories;
    const subcategory = req.params.products;
    const searchTerm = req.query.search;

    // const page = 'page=';
    
    // for(var page=0; page < page.length; i++);
  
    //console.log(searchTerm)

    let one = baseUrl + 'products/product_search?page=1'   + '&' + secKey;
    let two = baseUrl + 'products/product_search?page=2'   + '&' + secKey;
    let three = baseUrl + 'products/product_search?page=3'   + '&' + secKey;
    
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    
    axios.all([requestOne, requestTwo, requestThree])
    .then(axios
        .spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
      let prodsArray = responses[0].data.concat(responses[1].data,responses[2].data)
          //console.log(prodsArray);
          filteredArray=prodsArray.filter((obj)=>{
            return obj.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
          //console.log(filteredArray);
          res.render('search', {

                            products: filteredArray,
                            searchTerm: searchTerm
                         });
                 
        })
        )
        .catch(err=>{
            console.log(err);
        }) 
    };


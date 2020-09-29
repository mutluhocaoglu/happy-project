const axios = require('axios');
const express = require('express');
const router = require('../routes/categories');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./cart');
  }

//   const token = localStorage.getItem('token');
//   console.log(token);

const baseUrl = 'https://osf-digital-backend-academy.herokuapp.com/api/';
const secKey = 'secretKey=$2a$08$67c8Xo1GV7wlATbssHFwcOqe57KQBghh/8P5KL.0zWmocnwG19itC';

exports.getIndex = (req, res, next) => {
    res.render('index', {
        path: '/'
    });
};


exports.getAllCategories = (req, res, next) => {
    const categories = req.params.categories;
   
    axios.get(baseUrl + 'categories?' + secKey)
    
    .then((response) => {
    
    //console.log(categories);
            //console.log(response);

        let prodsArray = [];
        response.data.map((products) => {
        prodsArray.push(products);
        filteredArray = prodsArray.filter(
            (obj) => {
                return obj.parent_category_id === categories;
            })}
        );
        //console.log(filteredArray);
        res.render('categories', {
            products: filteredArray,
            categories: categories
        });
    })
    .catch(err => {
        console.log(err);
    })
};


exports.getSubCategories = (req, res, next) => {
    const categories = req.params.categories;
    const subcategories = req.params.subcategories;
    //console.log(subcategories);
    axios.get(baseUrl + 'categories?' + secKey)
    
    .then((response) => {
    
        
        //console.log(response);
        let prodsArray = [];
        
        response.data.map((products) => {
            prodsArray.push(products);
            filteredArray = prodsArray.filter(
                (obj) => {
                    return obj.parent_category_id === subcategories;
                })}
        );
            
            //console.log(filteredArray);
            res.render('subcategories', {
                products: filteredArray,
                categories: categories,
                subcategories:subcategories
                

             
            });
        })
        .catch(err => {
            console.log(err);
        })
    };

exports.getProducts = (req, res, next) => {
    const categories = req.params.categories;
    const subcategory = req.params.products;
    //console.log(subcategory);
    axios.get(baseUrl + 'products/product_search?primary_category_id=' + subcategory + '&' + secKey)
    
    .then((response) => {
    
    //console.log(subcategory);
        
        //console.log(response);
        let prodsArray = [];
        
        response.data.map((products) => {
            prodsArray.push(products);
            filteredArray = prodsArray.filter(
                (obj) => {
                    return obj.primary_category_id === categories;
                })}
        );
            
            //console.log(filteredArray);
            res.render('products', {
                products: response.data,
                categories: categories,
                subcategory:subcategory
                

             
            });
        })
        .catch(err => {
            console.log(err);
        })
    };

    exports.getProductId = (req, res, next) => {
        const categories = req.params.categories;
        const subcategory = req.params.products;
        const productId = req.params.id;
         //console.log(subcategory);
        axios.get(baseUrl + 'products/product_search?id=' + productId +  '&' + secKey)
        
        .then((response) => {
        
         //console.log(productId);
            
            //console.log(response);
            let prodsArray = [];
            
            response.data.map((products) => {
                prodsArray.push(products);
                filteredArray = prodsArray.filter(
                    (obj) => {
                        return obj.id === productId;
                    })}
                );
                //console.log(prodsArray);
                
                let id = prodsArray[0].id;
                let price = prodsArray[0].price;
                let variantId = prodsArray[0].variants[0].product_id;
               
                let idw = prodsArray[0].id;
                let variantIdw = prodsArray[0].variants[0].product_id;
                
                localStorage.setItem('id', id);
                localStorage.setItem('idw', idw);
                localStorage.setItem('variantIdw', variantIdw);
                localStorage.setItem('price', price);
                localStorage.setItem('variantId', variantId);
                console.log(id);
                console.log(variantId);

                res.render('singleprod', {
                    products: prodsArray,
                    // categories: categories,
                    productId: productId,
                    // subcategory:subcategory
                    
    
                 
                });
            })
            .catch(err => {
                console.log(err);
            })
        };

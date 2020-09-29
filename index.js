const express = require('express');
//const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');



const app = express();
//app.use(morgan('dev'));



app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'ultra super secret',
  resave: false,
  saveUninitialized: false
 }));

//app.use(express.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const wishlistRoutes = require('./routes/wishlist');
const userRoutes = require('./routes/user');
const categoriesRoutes = require('./routes/categories')
const searchTRoutes = require('./routes/search');

app.use(cartRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);
app.use(userRoutes);
app.use(categoriesRoutes);
app.use(searchTRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;
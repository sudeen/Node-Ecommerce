var router = require('express').Router();
var User = require('../models/user');
var Product = require('../models/product');


function paginate(req, res, next) {

  var perPage = 9;
  var page = req.params.page;

  Product
    .find()
    .skip( perPage * page)
    .limit( perPage )
    .populate('category')
    .exec(function(err, products) {
      if (err) return next(err);
      Product.count().exec(function(err, count) {
        if (err) return next(err);
        res.render('main/product-main', {
          products: products,
          pages: count / perPage
        });
      });
    });

}

/* Product.createMapping(function (err, mapping) {
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else {
    console.log("Mapping created");
    console.log(mapping);
  }
});

var stream = Product.synchronize();
var count = 0;

stream.on('date', function () {
  count++;
});

stream.on('close', function () {
  console.log("Indexed", + count + "documents");
});

stream.on('error', function (err) {
  console.log(err);
}); */

router.get('/', function(req, res, next) {

  if (req.user) {
    paginate(req, res, next);
  } else {
    res.render('main/home');
  }

});

router.get('/about', function (req, res) {
  res.render('main/about');
});

router.get('/products/:id', function (req, res, next) {
  Product
    .find({
      category: req.params.id
    })
    .populate('category')
    .exec(function (err, products) {
      if (err) return next(err);
      res.render('main/category', {
        products: products
      });
    });
});

router.get('/product/:id', function (req, res, next) {
  Product.findById({
    _id: req.params.id
  }, function (err, product) {
    if (err) return next(err);
    res.render('main/product', {
      product: product
    });
  });
});

router.post('/product/:product_id', function(req, res, next) {
  Cart.findOne({ owner: req.user._id }, function(err, cart) {
    // push is used to push the items into the cart
    cart.items.push({
      item: req.body.product_id,
      price: parseFloat(req.body.priceValue),
      quantity: parseInt(req.body.quantity)
    });

    cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);

    cart.save(function(err) {
      if (err) return next(err);
      return res.redirect('/cart');
    });
  });
});

router.get('/cart', function(req, res, next) {
  Cart
    .findOne({ owner: req.user._id })
    .populate('items.item')
    .exec(function(err, foundCart) {
      if (err) return next(err);
      res.render('main/cart', {
        foundCart: foundCart,
        message: req.flash('remove')
      });
    });
});


module.exports = router;
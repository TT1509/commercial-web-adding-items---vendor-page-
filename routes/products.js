const express = require('express');
const router = express.Router();
const productModel = require('../models/products')

router.get('/', (req, res) => {
    Product.find()
    .then((products) => {
        res.render('home', {products: products});
    })
    .catch((error) => console.log(error.message));
});

router.get('/order', (req, res) => {
    Product.find()
    .then((products) => {
        res.render('order', {products: products});
    })
    .catch((error) => console.log(error.message));
});

router.post('/checkout', (req, res) => {
    Product.find({ _id: { $in: req.body.products } })
    .then((products) => {
        res.render('order-summary', {customerName: `${req.body.firstName} ${req.body.lastName}`, products: products});
    })
    .catch((error) => {
        console.log(error.message);
    });
    
});


router.get('/product/:id/delete', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Cannot found that product ID!");
      }
      res.redirect("/");
    })
    .catch((error) => res.send(error));
});


router.get('/product/:id', (req, res) => {
    Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Cannot found that ID!");
      }
      res.render('product', {product: product});
    })
    .catch((error) => res.send(error));
});
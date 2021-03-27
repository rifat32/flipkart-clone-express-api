const express = require('express');
const { createCart } = require('../controllers/cartsController')
const router = express.Router();
const {requireSignin} = require('../common-middleware')



router.post('/carts',requireSignin,createCart);
// router.get('/categories',getCategories);

module.exports = router;
 const express = require('express');
   const { createCategory, getCategories } = require('../controllers/categoriesController')
 const router = express.Router();
 const {requireSignin,adminMiddleware} = require('../common-middleware')



 router.post('/categories',requireSignin,adminMiddleware,createCategory);
 router.get('/categories',getCategories);

 module.exports = router;
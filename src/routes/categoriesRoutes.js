 const express = require('express');
   const { createCategory, getCategories } = require('../controllers/categoriesController')
 const router = express.Router();
 const {requireSignin,adminMiddleware} = require('../common-middleware')
 const multer = require('multer');
 const path = require('path');

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 
       path.join(path.dirname(__dirname),'uploads') 
     
      )
  },
  filename: function (req, file, cb) {
    cb(null, 'categoryPicture' + '-' + Date.now() + Math.floor(Math.random() * 101) + file.originalname)
  }
})
const upload = multer({storage});


 router.post('/categories',requireSignin,adminMiddleware,upload.single('categoryPicture'),createCategory);
 router.get('/categories',getCategories);

 module.exports = router;
const express = require('express');
const { createProduct, getProducts } = require('../controllers/productsController')
const router = express.Router();
const {requireSignin,adminMiddleware} = require('../common-middleware')
 const multer = require('multer');
 const path = require('path');

 let counter = 1;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 
         path.join(path.dirname(__dirname),'uploads') 
       
        )
    },
    filename: function (req, file, cb) {
      cb(null, 'productImg' + '-' + Date.now() + Math.floor(Math.random() * 101) + file.originalname)
    }
  })
  const upload = multer({storage});
   
//   const upload = multer({ storage: storage })


router.post('/products',requireSignin,adminMiddleware, 
upload.array('productPicture[]'),
createProduct);
router.get('/products',getProducts);

module.exports = router;
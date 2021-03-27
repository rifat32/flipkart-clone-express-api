const express = require('express');
 const { signup, signin} = require('../controllers/auth');
const router = express.Router();



router.post('/signin',signin)
 router.post('/signup',signup);

// router.post('/profile',requireSignin,(req,res) => {
// return res.status(200).json({
//     user:"profile"
// });
// })
module.exports = router;
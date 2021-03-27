const express = require('express');
const { signup, signin} = require('../../controllers/Admin/auth');
const router = express.Router();


router.post('/admin/signin',signin)
router.post('/admin/signup',signup);


module.exports = router;

const Product = require('../models/Product');
const slugify = require('slugify');




exports.createProduct = (req, res) => {
  
//    return res.status(200).json({file:req.files,body:req.body})
const {
name, price, description, category, quantity

} = req.body;
let productPictures = [];

if(req.files){
    productPictures = req.files.map(el => {
        return  {
            img:el.filename
        }
    })
}

const product = new Product({
    name,
    slug:slugify(name),
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy:req.user._id
});
product.save((err, data) => {
    if(err) return res.status(400).json({
        status:400,
        err
    });
    if(data) return res.status(201).json(
        {
        status:201,
        data
    });
   });



}
//@@@@@@@@@@@@@@@@@@@ get category @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

 exports.getProducts = (req, res) => {
  
//     Category.find({})
//     .exec((err,data) => {
//     if(err) {
//         return res.status(400).json({
//             'status':400,
//             err
//          })
//      }
// if(data) {
//     return res.status(200).json({
//         'status':200,
//         data
//      })
// }     
//    })
  
    
    
    }
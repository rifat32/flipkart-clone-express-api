const Category = require('../models/Category');
 const slugify = require('slugify');


exports.createCategory = (req, res) => {
  let categoryPicture = req.file.filename
  let parentId = req.body.parentId
   
const categoriesObj = {
    name:req.body.name,
    slug:slugify(req.body.name)
}
if(parentId){
    categoriesObj.parentId = parentId
}
if(categoryPicture){
    categoriesObj.categoryPicture = categoryPicture
}


const category  =  new Category(categoriesObj);

category.save((err, data) => {
    if(err) {
            return res.status(400).json({
                'status':400,
                err
             })
         }
    if(data) {
        return res.status(201).json({
            'status':201,
            data
         })
    }     
})


}
//@@@@@@@@@@@@@@@@@@@ get category @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

 exports.getCategories = (req, res) => {
  
    Category.find({})
    .exec((err,data) => {
    if(err) {
        return res.status(400).json({
            'status':400,
            err
         })
     }
if(data) {
    return res.status(200).json({
        'status':200,
        data
     })
}     
   })
  
    
    
    }
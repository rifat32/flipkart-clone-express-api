const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name:{type:String,
     required:true,
     trim:true},
    slug:{type:String,
        required:true,
        unique:true},
    price:{type:Number, required:true  },
    quantity:{type:Number, required:true  },
    description:{
            type:String,
            required:true,
            trim:true
        },
        offers:{type:Number},
        productPictures:[
            {img : {type:String}}
        ],
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:true,
     
        },
        reviews:[
            {
              userId: {type: mongoose.Schema.Types.ObjectId,
               ref:'User'},
               review:{type:String}
            }
            
        ],
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
     
        }

},{timestamps:true});


module.exports = mongoose.model('Product',productsSchema)



const Cart = require('../models/Cart');
exports.createCart = (req, res) => {
    Cart.findOne({
        user: req.user._id,
    })
    .exec((err,data) => {
        if(err) {
            return res.status(400).json({
                'status':400,
                 err
             })
         }
    if(data) {
       
        const product = req.body.cartItems.product
        const item = data.cartItems.find(el => {
           return el.product == product
        })
       
        
        if(item) {
            Cart.findOneAndUpdate({ 'user': req.user._id, 'cartItems.product':product},{
                '$set':{
                    'cartItems':{
                        ...req.body.cartItems,
                        quantity: item.quantity +  req.body.cartItems.quantity

                    }
                }
            }).exec((_err, _data) => {
             if(_err) {
                     return res.status(400).json({
                         'status':400,
                          err:_err
                      })
                  }
             if(_data) {
                 return res.status(201).json({
                     'status':201,
                      data:_data
                  })
             }     
         })
        } else {
            Cart.findOneAndUpdate({ user: req.user._id},{
                '$push':{
                    'cartItems':req.body.cartItems
                }
            }).exec((_err, _data) => {
             if(_err) {
                     return res.status(400).json({
                         'status':400,
                          err:_err
                      })
                  }
             if(_data) {
                 return res.status(201).json({
                     'status':201,
                      data:_data
                  })
             }     
         })

        }


    

    } 
    else {
        const cart = new Cart({
            user: req.user._id,
            cartItems:req.body.cartItems
        })
        cart.save((err, data) => {
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
    })
 

}
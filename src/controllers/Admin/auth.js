const User = require('../../models/User');
const jwt = require('jsonwebtoken');

exports.signup = (req,res) => {
    User.findOne({
        email:req.body.email
    })
    .exec((error,user)=> {
    if(user){
        return res.status(400).json({
            'status':400,
            message: 'Admin already registered'
        })
    }
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username:Math.random().toString(),
        role:'admin'
    })
    _user.save((error,data) => {
    if(error){
        return res.status(400).json({
            'status':400,
            message:'Something went wrong'
        });
    }
    else{
        return res.status(201).json({
            'status':201,
            message:"Admin has been created successfully"
        });
    }
    });
    });
}
exports.signin = (req, res) => {
    User.findOne({
        email:req.body.email
    })
    .exec((error,user)=> {
        if(error){
            return res.status(400).json({
                'status':400,
                error
            });
        }
        if(user){
if(user.authenticate(req.body.password) && user.role === 'admin'){
    const token = jwt.sign({ _id: user._id,role:user.role }, process.env.JWT_SECRETE);
    const {_id,firstName,lastName,email,role} = user;
    return res.status(200).json({
        'status':200,
        token,
        data:{
            _id, firstName,lastName,email,role
        }
    })
}else{
    return res.status(400).json({
        'status':400,
        message:"password does not match"
    }) 
}
        }else{
            return res.status(400).json({
                'status':400,
                "message":"User not found"
            });
        }

    })
}


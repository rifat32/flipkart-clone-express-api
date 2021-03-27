const jwt = require('jsonwebtoken');
exports.requireSignin = (req,res,next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,process.env.JWT_SECRETE)
    req.user = user;
      next();
  }
  else {
    return res.status(400).json({
      message:"Unauthenticated"
    })
  }
  
}
exports.userMiddleware = (req,res,next) => {
  if( req.user.role !== 'user' ){
    return res.status(400).json({
      message:"User access denies"
    })
     }
     next();
}
exports.adminMiddleware = (req,res,next) => {
 if( req.user.role !== 'admin' ){
return res.status(400).json({
  message:"Admin access denies"
})
 }
 next();
}

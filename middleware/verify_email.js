const User = require("../models/User");

let verify_email_middleware = async function (req, res, next) {
  let user_id = req.user.id;
  let user = await User.findById(user_id);
  if(user.email_verify){
    next();
  }else{
    res.status(400).send({success : false , message : "you should verifyt you acount" , code : 111})
  }
};

module.exports = verify_email_middleware;


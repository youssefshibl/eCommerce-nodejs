// is admin middleware
const User = require("../models/User");

let is_admin_middleware = async function (req, res, next) {
  let user_id = req.user.id;
  let user = await User.findById(user_id);
  if (user.isAdmin) {
    next();
  } else {
    res
      .status(401)
      .send({ success: false, message: "you should be admin"});
  }
};

module.exports = is_admin_middleware;
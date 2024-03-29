const jwt = require("jsonwebtoken");
const User = require("../models/User");

let api = process.env.API_URL;

let auth_middle_ware = async function (req, res, next) {
  let path = req.path;
  let method = req.method;
  const secret = process.env.secret;

  let token = req.headers["authorization"];
  // seperate token from bearer
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "missing jwt token" });
  }
  try {
    const authnToken = jwt.verify(token, secret);
    let id = authnToken.userID;
    let user = await User.findById(id).select("name email").exec();
    if (!user) {
      res.status(400).send({ success: false, message: "this token for deleted user" });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ success: false, message: "token is not valid" });
  }
};

module.exports = auth_middle_ware;

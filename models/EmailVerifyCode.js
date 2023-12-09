const mongoose = require("mongoose");


const email_verify = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

let EmailVerify = mongoose.model("EmailVerify", email_verify);

module.exports = EmailVerify;


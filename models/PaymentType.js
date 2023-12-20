const mongoose = require("mongoose");

const payment_type = mongoose.Schema({
  method: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },

});

let PaymentType = mongoose.model("PaymentType", payment_type);

module.exports = PaymentType;

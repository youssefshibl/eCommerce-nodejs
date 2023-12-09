const mongoose = require("mongoose");

const payment_type = mongoose.Schema({
  method: {
    type: String,
    default: "",
  },
});

let PaymentType = mongoose.model("PaymentType", payment_type);

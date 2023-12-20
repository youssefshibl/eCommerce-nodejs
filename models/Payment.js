const mongoose = require("mongoose");

const payment = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  payment_type: {
    type: mongoose.Types.ObjectId,
    ref: "PaymentType",
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Payment", payment);

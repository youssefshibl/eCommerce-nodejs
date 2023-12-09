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
  is_default: {
    type: Boolean,
    default: false,
  },
  expiry_date: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Payment", payment);

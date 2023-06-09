const mongoose = require("mongoose");

const payment = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  method: String,
  amount: String,
  status: Boolean,
});

module.exports = mongoose.model("Payment", payment);


const mongoose = require("mongoose");

const order = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    payment_id: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
    },
    products: [
      {
        product_id: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", order);


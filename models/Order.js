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
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
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
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", order);

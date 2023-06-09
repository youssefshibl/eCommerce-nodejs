const mongoose = require("mongoose");

const cart = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
});

module.exports = mongoose.model("Cart", cart);


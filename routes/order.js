const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

// make order and delete all poroduc from cart 
router.post("/makeorder", auth_middleware, async (req, res) => {
  let user_id = req.user.id;
  let payment_method = req.body.payment_method;
  // assume that payment method will done when order recived
  // get all product  ;
  let usercart = await Cart.findOne({ user_id: user_id }).populate(
    "products.product_id"
  );
  let products = usercart.products;
  if (products.length == 0) {
    res.status(400).send({
      success: false,
      message: "the cart is empty",
    });
    return;
  }
  let price = products.reduce((total, one) => {
    return total + Number(one.quantity) * Number(one.product_id.price);
  }, 0);
  let payment = await Payment.create({
    user_id: user_id,
    method: payment_method,
    amount: `${price}`,
    status: false,
  });
  // make order
  let order = new Order({
    user_id: user_id,
    payment_id: payment,
    products: products,
  });
  await order.save();
  await order.populate("products.product_id");
  // delete all produc from cart
  await Cart.findOneAndUpdate(
    {
      user_id: user_id,
    },
    {
      $set: {
        products: [],
      },
    }
  );
  res.status(200).send({
    success: true,
    data: order,
  });
});

// get all order
router.get("/allorder", auth_middleware, async (req, res) => {
  let orders = await Order.find({ user_id: req.user.id }).populate([
    {
      path: "user_id",
      select: "name email",
    },
    {
      path: "products.product_id",
    },
    {
      path: "payment_id",
    },
  ]);
  res.status(200).send({
    success: true,
    data: orders,
  });
});

module.exports = router;


const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const PaymentType = require("../models/PaymentType");
const Address = require("../models/Address");

async function makeorder(req, res) {
  let user_id = req.user.id;
  let payment_id = req.body.payment_id;
  let address = req.body.address_id;
  let payment_method = await PaymentType.findOne({ _id: payment_id });
  if (!payment_method) {
    res.status(400).send({
      success: false,
      message: "payment method not found",
    });
    return;
  }
  // get address
  address = await Address.findOne({ _id: address });
    if (!address) {
        res.status(400).send({
        success: false,
        message: "address not found",
        });
        return;
    }

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
    address: address,
  });
  // make order
  let order = new Order({
    user_id: user_id,
    payment_id: payment,
    products: products,
  });
  await order.save();
  if (!order) {
    res.status(400).send({
      success: false,
      message: "order not created",
    });
    return;
  }
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
  return;
}

async function allorder(req, res) {
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
  if (!orders) {
    res.status(400).send({
      success: false,
      message: "order not found",
    });
    return;
  }
  res.status(200).send({
    success: true,
    data: orders,
  });
}

module.exports = {
  makeorder,
  allorder,
};

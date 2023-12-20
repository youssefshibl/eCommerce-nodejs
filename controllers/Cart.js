const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

async function addtocart(req, res) {
  console.log(req.body);
  let product_id = req.body.product_id;
  if (!product_id) {
    res.status(400).send({
      success: false,
      message: "product id is required",
    });
    return;
  }

  let user_id = req.user.id;
  // get cart of user
  let usercart = await Cart.findOne({ user_id: user_id }).populate(
    "products.product_id"
  );
  if (!usercart) {
    usercart = await Cart.create({ user_id: user_id });
  }
  // check if id is valid or not
  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    res.status(400).send({
      success: false,
      message: "product id is not valid",
    });
    return;
  }

  let product = await Product.findById(String(product_id));
  if (!product) {
    res.status(400).send({
      success: false,
      message: "this product not found ",
    });
    return;
  }
  // check that if porduct is exit or not
  let allproduct = usercart.products;
  let indexporduct = allproduct.findIndex((element) => {
    return element.product_id.id.toString() == product.id;
  });
  let newcart;
  if (indexporduct >= 0) {
    // update product to cart
    newcart = await Cart.findOneAndUpdate(
      { _id: usercart._id },
      {
        $set: {
          [`products.${indexporduct}.quantity`]:
            allproduct[indexporduct].quantity + 1,
        },
      },
      { new: true }
    ).populate("products.product_id");
  } else {
    //save product to cart
    newcart = await Cart.findOneAndUpdate(
      { _id: usercart._id },
      {
        $push: {
          products: {
            product_id: product,
            quantity: 1,
          },
        },
      },
      { new: true }
    ).populate("products.product_id");
  }

  res.status(200).send({
    success: true,
    data: newcart,
  });
}

async function deletefromcart(req, res) {
  let product_id = req.body.product_id;
  if (typeof product_id === "number") {
    product_id = product_id.toString();
  }
  let user_id = req.user.id;
  // get cart of user
  let usercart = await Cart.findOne({ user_id: user_id }).populate(
    "products.product_id"
  );
  if (!usercart) {
    usercart = await Cart.create({ user_id: user_id });
    res.status(400).send({
      success: false,
      message: "the cart not found befroe but maked ",
    });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    res.status(400).send({
      success: false,
      message: "product id is not valid",
    });
    return;
  }
  let product = await Product.findById(String(product_id));
  if (!product) {
    res.status(400).send({
      success: false,
      message: "this product not found ",
    });
    return;
  }
  // check that if porduct is exit or not
  let allproduct = usercart.products;
  let indexporduct = allproduct.findIndex((element) => {
    return element.product_id.id.toString() == product.id;
  });
  let newcart;
  if (indexporduct >= 0) {
    newcart = await Cart.findOneAndUpdate(
      { _id: usercart._id },
      {
        $pull: {
          products: {
            $eq: allproduct[indexporduct],
          },
        },
      },
      { new: true }
    ).populate("products.product_id");
    res.status(200).send({
      success: true,
      data: newcart,
    });
    return;
  } else {
    res.status(400).send({
      success: false,
      message: "this product dont added before in cart",
    });
    return
  }
}

async function clearcart(req, res) {
  let user_id = req.user.id;
  // get cart of user
  let usercart = await Cart.findOne({ user_id: user_id }).populate(
    "products.product_id"
  );
  if (!usercart) {
    usercart = await Cart.create({ user_id: user_id });
    res.status(400).send({
      success: false,
      message: "the cart not found befroe but maked ",
    });
    return;
  }

  let deletecart = await Cart.findOneAndUpdate(
    { _id: usercart._id },
    {
      $set: {
        products: [],
      },
    }
  );

  return res.status(200).send({
    success: true,
    message: "the cart is cleared",
  });
}

async function getallproduct(req, res) {
  let user_id = req.user.id;
  // get cart of user
  let usercart = await Cart.findOne({ user_id: user_id }).populate(
    "products.product_id"
  );
  if (!usercart) {
    usercart = await Cart.create({ user_id: user_id });
    res
      .status(400)
      .send({
        success: false,
        message: "the cart not found befroe but maked ",
      })
      .populate("products.product_id");
    return;
  }
  res.status(200).send({
    success: true,
    data: usercart.products,
  });
}

module.exports = {
  addtocart,
  deletefromcart,
  clearcart,
  getallproduct
};

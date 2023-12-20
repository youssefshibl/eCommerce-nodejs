const Category = require("../models/Categories");
const Product = require("../models/Product");
const fs = require("fs");

async function addproduct(req, res) {
  let file = req.file;
  if (!file) {
    res.status(400).send({
      success: false,
      message: "missing image",
    });
    return;
  }

  let name = req.body.name;
  if (!name) {
    res.status(400).send({
      success: false,
      message: "missing name",
    });
    return;
  }

  let description = req.body.description;
  if (!description) {
    res.status(400).send({
      success: false,
      message: "missing description",
    });
    return;
  }

  let price = req.body.price;
  if (!price) {
    res.status(400).send({
      success: false,
      message: "missing price",
    });
    return;
  }

  let category_id = req.body.category_id;
  if (!category_id) {
    res.status(400).send({
      success: false,
      message: "missing category_id",
    });
    return;
  }

  let category = await Category.findById(category_id);
  if (!category) {
    res.status(200).send({
      success: false,
      message: "dont find this category",
    });
    return;
  }

  let product = new Product({
    name: name,
    description: description,
    image: file ? req.image_saved_name : null,
    price: price,
    category: category_id,
  });
  product = await product.save();
  if (!product) {
    res.status(400).send({
      success: false,
      message: "cant save product",
    });
    // delete image
    fs.unlinkSync("./uploads/" + req.image_saved_name);
    return;
  }

  res.status(200).send({
    success: true,
    data: product,
  });
  return;
}

async function getallproducts(req, res) {
  // making filtering
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  //console.log(filter)
  let products = await Product.find(filter).populate("category");
  res.status(200).send({
    success: true,
    data: products,
  });
}

async function getproduct(req, res) {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({
      success: false,
      message: " missing id of product",
    });
    return;
  }
  let product = await Product.findById(id).populate("category");
  if (!product) {
    res.status(400).send({
      success: false,
      message: "this product not found",
    });
    return;
  }
  res.status(200).send({
    success: true,
    data: product,
  });
}

async function updateproduct(req, res) {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({
      success: false,
      message: " missing id of product",
    });
    return;
  }

  let Uproduct = await Product.findById(id);
  if (!Uproduct) {
    res.status(400).send({
      success: false,
      message: "this product not found",
    });
    return;
  }

  if (req.body.name) {
    Uproduct.name = req.body.name;
  }
  if (req.body.price) {
    Uproduct.price = req.body.price;
  }
  if (req.body.description) {
    Uproduct.description = req.body.description;
  }
  if (req.body.category_id) {
    Uproduct.category = await Category.findById(req.body.category_id);

    if (!Uproduct.category) {
      res.status(400).send({
        success: false,
        message: "this category not found",
      });
      return;
    }
  }
  if (req.file) {
    Uproduct.image = req.file.filename;
  }

  Uproduct = await Uproduct.save();
  if (!Uproduct) {
    res.status(400).send({
      success: false,
      message: "cant update product",
    });
    return;
  }
  res.status(200).send({
    success: true,
    data: Uproduct,
  });
}

async function deleteproduct(req, res) {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({
      success: false,
      message: " missing id of product",
    });
    return;
  }

  let product = await Product.findById(id);
  if (!product) {
    res.status(400).send({
      success: false,
      message: "this product not found",
    });
    return;
  }
  product = await product.deleteOne();
  if (!product) {
    res.status(400).send({
      success: false,
      message: "cant delete product",
    });
    return;
  }
  res.status(200).send({
    success: true,
    data: product,
  });
  return 
}

module.exports = {
  addproduct,
  getallproducts,
  getproduct,
  updateproduct,
  deleteproduct,
};

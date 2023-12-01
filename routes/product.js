const express = require("express");
const router = express.Router();
const multer = require("multer");
const Category = require("../models/Categories");
const Product = require("../models/Product");

// storeage to save file uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    let newfilename = `product-image-${Date.now()}-${file.originalname}`;
    req.image_saved_name = newfilename ;
    cb(null, newfilename); // Use the original file name as the filename
  },
});
const upload = multer({ storage: storage });

// add product
router.post("/addproduct", upload.single("image"), async (req, res) => {
  debugger ;
  let file = req.file;
  let name = req.body.name;
  let description = req.body.description;
  let price = req.body.price;
  let category_id = req.body.category_id;
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
  res.status(200).send({
    success: true,
    data: product,
  });
});

// get all product
router.get("/getallproducts", async (req, res) => {
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
});

// make product by id
router.get("/getproduct/:id", async (req, res) => {
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
});

// update product
router.post("/updateproduct/:id", upload.single("image"), async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({
      success: false,
      message: " missing id of product",
    });
    return;
  }
  // make check which updated
  let update = {};
  if (req.body.name) {
    update.name = req.body.name;
  }
  if (req.body.price) {
    update.price = req.body.price;
  }
  if (req.body.description) {
    update.description = req.body.description;
  }
  if (req.body.category_id) {
    update.category = await Category.findById(req.body.category_id);
  }
  if (req.file) {
    update.image = req.file.filename;
  }
  let product = await Product.findByIdAndUpdate(id, update, { new: true });
  res.send(product);
});

// delete product
router.delete("/deleteproduct/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status(400).send({
      success: false,
      message: " missing id of product",
    });
    return;
  }
  let product = await Product.findByIdAndDelete(id);
  if (product) {
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({
      success: false,
      message: "cant find this category",
    });
  }
});

// get count fo product
router.get("/productcount", async (req, res) => {
  let count = await Product.count();
  res.status(200).send({
    success: true,
    data: count,
  });
});

router.get("/testo" , (req ,res)=>{
    
    console.log(req.cookies)
    res.status(200).send({
        data: req.cookies,
        success: true
    })

})
module.exports = router;


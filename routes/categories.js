const express = require("express");
const router = express.Router();
const Category = require("../models/Categories");


// add product
router.post("/addcategory", async (req, res) => {
  let name = req.body.name;
  let icon = req.body.icon;
  let newcategory = new Category({
    name: name,
    icon: icon,
  });
  newcategory = await newcategory.save();
  if (newcategory) {
    res.status(200).send({
      success: true,
      data: newcategory,
    });
  } else {
    res.status(400).send({
      success: false,
      message: "some thing is wrong in server",
    });
  }
});

router.get("/getallcategories", async (req, res) => {
  try {
    let Categories = await Category.find({});
    if (Categories) {
      res.status(200).send({
        success: true,
        data: Categories,
      });
      return;
    }
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) {
    res.status.send({
      success: false,
      message: "missing id of delete category",
    });
    return;
  }
  let deleted = await Category.findByIdAndDelete(id);
  if (deleted) {
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({
      success: false,
      message: "cant find this category",
    });
  }
});

module.exports = router;


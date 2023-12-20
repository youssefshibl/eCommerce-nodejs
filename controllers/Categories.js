const Category = require("../models/Categories");

async function addcategory(req, res) {
  let name = req.body.name;
  if (!name) {
    res.status(400).send({
      success: false,
      message: "missing name of category",
    });
    return;
  }
  let description = req.body.description;
  if (!description) {
    res.status(400).send({
      success: false,
      message: "missing description of category",
    });
    return;
  }
  let image = req.body.image;
  if (!image) {
    res.status(400).send({
      success: false,
      message: "missing image of category",
    });
    return;
  }
  let parent = req.body.parent;
  if (parent) {
    let parentcategory = await Category.findById(parent);
    if (!parentcategory) {
      res.status(400).send({
        success: false,
        message: "cant find parent category",
      });
      return;
    }
  } else {
    parent = null;
  }
  let newcategory = new Category({
    name: name,
    description: description,
    image: image,
    parent: parent,
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
}

async function getallcategories(req, res) {
  let Categories = await Category.find({});
  if (Categories) {
    res.status(200).send({
      success: true,
      data: Categories,
    });
    return;
  } else {
    res.status(400).send({
      success: false,
      message: "some thing is wrong in server",
    });
  }
}

async function deletecategory(req, res) {
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
    res.status(200).send({
      success: true,
      message: "category deleted",
    });
  } else {
    res.status(400).send({
      success: false,
      message: "cant find this category",
    });
  }
}

async function updatecategory(req, res) {
  let id = req.body.id;
  if (!id) {
    res.status(400).send({
      success: false,
      message: "missing id of category",
    });
    return;
  }
  let category = await Category.findById(id);
  if (!category) {
    res.status(400).send({
      success: false,
      message: "cant find this category",
    });
    return;
  }
  let name = req.body.name;
  if (name) {
    category.name = name;
  }
  let description = req.body.description;
  if (description) {
    category.description = description;
  }
  let image = req.body.image;
  if (image) {
    category.image = image;
  }
  let parent = req.body.parent;
  if (parent) {
    let parentcategory = await Category.findById(parent);
    if (!parentcategory) {
      res.status(400).send({
        success: false,
        message: "cant find parent category",
      });
      return;
    }
    category.parent = parent;
  }
  category = await category.save();
  if (category) {
    res.status(200).send({
      success: true,
      data: category,
    });
  } else {
    res.status(400).send({
      success: false,
      message: "some thing is wrong in server",
    });
  }
  return;
}

module.exports = {
  addcategory,
  getallcategories,
  deletecategory,
  updatecategory,
};

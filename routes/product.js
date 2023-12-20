const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth_middleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const ProductController = require("../controllers/Product");

// storeage to save file uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    let newfilename = `product-image-${Date.now()}-${file.originalname}`;
    req.image_saved_name = newfilename;
    cb(null, newfilename); // Use the original file name as the filename
  },
});
const upload = multer({ storage: storage });

// add product add swagger doc

/**
 * @swagger
 * /product/addproduct:
 *   post:
 *     tags:
 *      - Product
 *     summary: Add a new product
 *     description: Endpoint to add a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *                 default: xbox
 *               description:
 *                 type: string
 *                 description: The product description
 *                 default: device for playing games
 *               price:
 *                 type: number
 *                 description: The product price
 *                 default: 1000
 *               category_id:
 *                 type: string
 *                 description: The product category_id
 *                 default: 5f8f8a2f3e3d7b2a7c3b0d3c
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */

router.post("/addproduct", upload.single("image"), async (req, res) => {
  return ProductController.addproduct(req, res);
});

// get all product

/**
 * @swagger
 * /product/getallproducts:
 *   get:
 *     tags:
 *      - Product
 *     summary: Get products
 *     description: Retrieve a list of products with optional category filtering
 *     parameters:
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Comma-separated list of category IDs to filter the products
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 */

router.get("/getallproducts", async (req, res) => {
  return ProductController.getallproducts(req, res);
});

// make product by id

/**
 * @swagger
 * /product/getproduct/{id}:
 *   get:
 *     tags:
 *      - Product
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *           description: Retrieve a product by ID
 *           default: 5f8f8a2f3e3d7b2a7c3b0d3c
 *     responses:
 *       200:
 *         description: Successful response

 *       400:
 *         description: Invalid request or product not found

 */

router.get("/getproduct/:id", async (req, res) => {
  return ProductController.getproduct(req, res);
});

// update product

/**
 * @swagger
 * /product/updateproduct/{id}:
 *   put:
 *     tags:
 *      - Product
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *                 default: xbox
 *               description:
 *                 type: string
 *                 description: The product description
 *                 default: device for playing games
 *               price:
 *                 type: number
 *                 description: The product price
 *                 default: 1000
 *               category_id:
 *                 type: string
 *                 description: The product category_id
 *                 default: 5f8f8a2f3e3d7b2a7c3b0d3c
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid request or product not found
 *         
 */

router.put(
  "/updateproduct/:id",
  auth_middleware,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    return ProductController.updateproduct(req, res);
  }
);

// get count fo product
router.get("/productcount", async (req, res) => {
  let count = await Product.count();
  res.status(200).send({
    success: true,
    data: count,
  });
});


// delete product

/**
 * @swagger
 * /product/deleteproduct/{id}:
 *   delete:
 *     tags:
 *      - Product
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Invalid request or product not found
 */

router.delete("/deleteproduct/:id", auth_middleware, isAdmin, async (req, res) => {
  return ProductController.deleteproduct(req, res);
});

module.exports = router;

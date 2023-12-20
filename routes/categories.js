const express = require("express");
const router = express.Router();
const Categories = require("../controllers/Categories");
const auth_middleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
// add category

/**
 * @swagger
 * /categories/addcategory:
 *   post:
 *     tags:
 *       - Category
 *     description: Use to add category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name
 *                 default: fruits
 *               description:
 *                 type: string
 *                 description: The category description
 *                 default: any thing
 *               image:
 *                 type: string
 *                 description: The category image
 *                 default: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 *               parent:
 *                 type: string
 *                 description: The category parent
 *                 default: 
 *     responses:
 *      '200':
 *        description: A successful response
 * 
 * 
*/
router.post("/addcategory", auth_middleware, isAdmin, async (req, res) => {
  Categories.addcategory(req, res);
});

// geta all categories

/**
 * @swagger
 * /categories/getallcategories:
 *   get:
 *     tags:
 *       - Category
 *     description: Use to get all categories
 *     responses:
 *      '200':
 *        description: A successful response
 * 
 * 
*/

router.get("/getallcategories", async (req, res) => {
  Categories.getallcategories(req, res);
});

// delete category

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     description: Use to delete category
 *     parameters:
 *       - name: id
 *         in: path
 *         description: category id
 *         required: true
 *         type: string
 *         default: 
 *     responses:
 *      '200':
 *        description: A successful response
 * 
 * 
*/


router.delete("/:id", async (req, res) => {
  Categories.deletecategory(req, res);
});


// update category

/**
 * @swagger
 * /categories/updatecategory:
 *   post:
 *     tags:
 *       - Category
 *     description: Use to add category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The category id
 *                 default: 60f0b1e3b3c8d52f5c0f9d8b
 *               name:
 *                 type: string
 *                 description: The category name
 *                 default: fruits
 *               description:
 *                 type: string
 *                 description: The category description
 *                 default: any thing
 *               image:
 *                 type: string
 *                 description: The category image
 *                 default: https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 *               parent:
 *                 type: string
 *                 description: The category parent
 *                 default: 
 *     responses:
 *      '200':
 *        description: A successful response
 * 
 * 
*/

router.post("/updatecategory", async (req, res) => {
  Categories.updatecategory(req, res);
});

module.exports = router;

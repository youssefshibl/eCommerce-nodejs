const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
;
const address = require("../models/Address");
const mongoose = require("mongoose");
const CartController = require("../controllers/Cart");
// add product to cart


/**
 * @swagger
 * /cart/addtocart:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add to the cart
 *             example:
 *               product_id: "60a7f8e9e8e9a7b8c9d7e6f5"
 *     responses:
 *       200:
 *         description: Success'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 * 
 */


router.post("/addtocart", auth_middleware, async (req, res) => {
return CartController.addtocart(req, res);
});


/**
 * @swagger
 * /cart/deletefromcart:
 *   delete:
 *     summary: Delete a product from the cart
 *     description: Deletes a product from the user's cart based on the provided product ID.
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add to the cart
 *             example:
 *               product_id: "60a7f8e9e8e9a7b8c9d7e6f5"
 * 
 *     responses:
 *       200:
 *         description: Success'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

// delete product form cart
router.delete("/deletefromcart", auth_middleware, async (req, res) => {
return CartController.deletefromcart(req, res);
});

// delete all product

/**
 * @swagger
 * /cart/clearcart:
 *   delete:
 *     summary: Clear the user's cart
 *     description: Clears all products from the user's cart.
 *     tags:
 *       - Cart
 * 
 *     responses:
 *       200:
 *         description: Success'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */


router.delete("/clearcart", auth_middleware, async (req, res) => {
return CartController.clearcart(req, res);
});

// get all product in my cart

/**
 * @swagger
 * /cart/getallproduct:
 *   get:
 *     summary: Get all products in the user's cart
 *     description: Retrieves all products in the user's cart.
 *     tags:
 *       - Cart
 * 
 *     responses:
 *       200:
 *         description: Success'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 * 
 * 
 */
router.get("/getallproduct", auth_middleware, async (req, res) => {
return CartController.getallproduct(req, res);
});

module.exports = router;


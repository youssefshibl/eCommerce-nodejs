const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const ordercontroller = require("../controllers/Order");

// make order and delete all poroduc from cart

/**
 * @swagger
 * /order/makeorder:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_id:
 *                 type: string
 *                 description: payment id
 *                 default: 658220627bed4f2dfb7968dd
 *
 *
 *     responses:
 *       '200':
 *         description: A successful response
 *
 *
 */

router.post("/makeorder", auth_middleware, async (req, res) => {
  return ordercontroller.makeorder(req, res);
});

// get all order

/**
 * @swagger
 * /order/allorder:
 *   get:
 *     summary: Get all orders for a user
 *     tags:
 *       - Order
 *
 *     responses:
 *       '200':
 *         description: A successful response
 *
 */
router.get("/allorder", auth_middleware, async (req, res) => {
  return ordercontroller.allorder(req, res);
});

module.exports = router;

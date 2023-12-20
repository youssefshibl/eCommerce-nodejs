const express = require("express");
const router = express.Router();
const PaymentTypeControll = require("../controllers/PaymentType");
const auth_middle_ware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// add payment type
/**
 * @swagger
 * /payment/addpaymenttype:
 *   post:
 *     tags:
 *       - Payment
 *     description: Use to add payment type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *                 description: The payment method
 *                 default: cash
 *               description:
 *                 type: string
 *                 description: The payment description
 *                 default: cash on delivery
 *               status:
 *                 type: string
 *                 description: The payment status
 *                 default: active
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/addpaymenttype", auth_middle_ware , isAdmin,async (req, res) => {
  return await PaymentTypeControll.add(req, res);
});


// add payment to user





module.exports = router;
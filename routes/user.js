const express = require("express");
const router = express.Router();
const email_verify_middleware = require("../middleware/verify_email");
const auth_middleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const UserControll = require("../controllers/User");

// register user
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - User
 *     description: Use to register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user name
 *                 default: ahmed
 *               email:
 *                 type: string
 *                 description: The user email
 *                 default: ahmed@gmail.com
 *               password:
 *                 type: string
 *                 description: The user password
 *                 default: ahmedeng123456
 *               confirmPassword:
 *                 type: string
 *                 description: The user confirmPassword
 *                 default: ahmedeng123456
 *     responses:
 *       '200':
 *         description: A successful response
 */

router.post("/register", async (req, res) => {
  return await UserControll.register(req, res);
});

// login user
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     description: Use to login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user email
 *                 default: ahmed@gmail.com
 *               password:
 *                type: string
 *                description: The user password
 *                default: ahmedeng123456
 *     responses:
 *      '200':
 *        description: A successful response
 *
 *
 */
router.post("/login", async (req, res) => {
  return await UserControll.login(req, res);
});

// delete account
/**
 * @swagger
 * /users/deleteaccount:
 *   delete:
 *     tags:
 *       - User
 *     description: Use to delete a user account
 *     responses:
 *      '200':
 *        description: A successful response
 *
 */

router.delete("/deleteaccount", auth_middleware, async (req, res) => {
  return await UserControll.deleteAccount(req, res);
});

// delete user
/**
 * @swagger
 * /users/deleteuser/{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: Use to delete a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: A successful response
 *
 */
router.delete("/deleteuser/:id", auth_middleware, isAdmin, async (req, res) => {
  return await UserControll.deleteUser(req, res);
});

// get user
/**
 * @swagger
 * /users/getuser/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Use to get a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: A successful response
 *
 */
router.get("/getuser/:id", auth_middleware, isAdmin, async (req, res) => {
  return await UserControll.getUser(req, res);
});

// get me
/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - User
 *     description: Use to get a user
 *     responses:
 *      '200':
 *        description: A successful response
 *
 */
router.get(
  "/me",
  auth_middleware,
  email_verify_middleware,
  async (req, res) => {
    return await UserControll.me(req, res);
  }
);

// get all users
/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *       - User
 *     description: Use to get all users
 *     responses:
 *      '200':
 *        description: A successful response
 *
 */
router.get("/", auth_middleware, isAdmin, async (req, res) => {
  return await UserControll.getAllUser(req, res);
});

// route for send code to email to make verifytion
// set swagger docs for this route

/**
 * @swagger
 * /users/resendcode:
 *   get:
 *     tags:
 *       - User
 *     description: Use to resend verification code
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get("/resendcode", auth_middleware, async (req, res) => {
  return await UserControll.resendCode(req, res);
});

// route for verify email
/**
 * @swagger
 * /users/verifyemail:
 *   post:
 *     tags:
 *       - User
 *     description: Use to verify email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The user code
 *                 default: 123456
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post("/verifyemail", auth_middleware, async (req, res) => {
  return await UserControll.verifyEmail(req, res);
});

module.exports = router;


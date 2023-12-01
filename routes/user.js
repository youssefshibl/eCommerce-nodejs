const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth_middleware = require("../middleware/auth");
const email_verify_middleware = require("../middleware/verify_email");
const User = require("../models/User");
const EmailVerify = require("../models/EmailVerifyCode");
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/register", async (req, res) => {
  let user_exist = await User.findOne({ email: req.body.email });
  if (user_exist) {
    res.status(400).send({ success: false, message: "this email is exits" });
    return;
  }
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();

  if (!user) return res.status(404).send("User cannot be created");
  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    res
      .status(400)
      .send({
        success: false,
        message: "email or password may be not correrct",
      });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userID: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res
      .status(400)
      .send({
        success: false,
        message: "email or password may be not correrct",
      });
  }
});

// delete user
router.delete("/:id", auth_middleware, async (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ success: false, message: "this id is not valid" });
    return;
  }
  let user = await User.findByIdAndRemove(id);
  if (user) {
    res.status(200).send({ sucess: true, message: "use deleted success" });
  } else {
    res.status(400).send({ sucess: false, message: "user not found" });
  }
});

// get user

router.get("/getuser/:id", auth_middleware, async (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ success: false, message: "this id is not valid" });
    return;
  }

  let user = await User.findById(req.params.id).select("-passwordHash");
  console.log(user);
  if (user) {
    res.status(200).send({ sucess: true, user: user });
  } else {
    res.status(400).send({ sucess: false, message: "user not found" });
  }
});

// get all user
router.get(
  "/me",
  auth_middleware,
  email_verify_middleware,
  async (req, res) => {
    let data = await req.user;
    res.status(200).send({ success: true, data: data });
  }
);

router.get("/", auth_middleware, async (req, res) => {
  let users = await User.find({}).select("-passwordHash");
  if (users) {
    res.status(200).send({ sucess: true, data: users });
  } else {
    res.status(400).send({ sucess: false, message: "not found users" });
  }
});

// route for send code to email to make verifyt

router.get("/resendcode", auth_middleware, async (req, res) => {
  let user_id = req.user.id;
  let email = req.user.email;
  let randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "verify you email",
    html: `the code to verfiy is ${randomNum}`,
  };
  // check first if this user try to send before or this is first one
  let old_berify = await EmailVerify.findOne({ user_id: user_id });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  if (old_berify) {
    old_berify.code = randomNum;
    await old_berify.save();

    res.status(200).send({
      success: true,
      message: `check you email we send code to ${email}`,
    });
  } else {
    let code_verify = await EmailVerify.create({
      user_id: user_id,
      code: randomNum,
    });
    res.status(200).send({
      success: true,
      message: `check you email we send code to ${email}`,
    });
  }
});

router.post("/verifyemail", auth_middleware, async (req, res) => {
  let code = req.body.code;
  let verify_email = await EmailVerify.findOne({ user_id: req.user.id });
  console.log(code, "   ", verify_email.code, " ", req.user.id);
  if (code == verify_email.code) {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { email_verify: true },
      {
        new: true,
      }
    );
    res.status(200).send({ success: true, data: user });
  } else {
    res.status(400).send({
      success: false,
      message: "verified code is not correct",
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth_middleware = require("../middleware/auth");
const email_verify_middleware = require("../middleware/verify_email");
const User = require("../models/User");
const EmailVerify = require("../models/EmailVerifyCode");
const mongoose = require("mongoose");
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
const crypto = require("crypto");

async function register(req, res) {
  // check if user send all data
  if (!req.body.name) {
    res.status(400).send({ success: false, message: "name is required" });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({ success: false, message: "email is required" });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({ success: false, message: "password is required" });
    return;
  }
  if (!req.body.confirmPassword) {
    res
      .status(400)
      .send({ success: false, message: "confirm password is required" });
    return;
  }
  if (req.body.password != req.body.confirmPassword) {
    res.status(400).send({
      success: false,
      message: "password and confirm password not match",
    });
    return;
  }

  // check if email is exist
  let user_exist = await User.findOne({ email: req.body.email });
  if (user_exist) {
    res.status(400).send({ success: false, message: "email is exist" });
    return;
  }

  // check if password is secure
  const isPwned = await isPasswordPwned(req.body.password);
  if (isPwned) {
    res.status(400).send({ success: false, message: "password is not secure" });
    return;
  }

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });

  user = await user.save();

  if (!user) return res.status(404).send("User cannot be created");

  // geneate jwt token
  const secret = process.env.secret;
  // expire after 1 week
  const token = jwt.sign(
    {
      userID: user.id,
      isAdmin: user.isAdmin,
    },
    secret,
    { expiresIn: "1w" }
  );

  // attach token to response object
  res.status(200).send({ user: user, token: token });
}

async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    res
      .status(400)
      .send({ success: false, message: "email or password is required" });
    return;
  }

  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!user) {
    res.status(400).send({
      success: false,
      message: "email or password may be not correrct",
    });
    return;
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
    res.status(400).send({
      success: false,
      message: "email or password may be not correrct",
    });
  }
  return
}

async function deleteUser(req, res) {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({ success: false, message: "this id is not valid" });
    return;
  }
  let user = await User.findByIdAndRemove(id);
  if (user) {
    res.status(200).send({ sucess: true, message: "user deleted success" });
  } else {
    res.status(400).send({ sucess: false, message: "user not found" });
  }
}

async function getUser(req, res) {
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
}

async function me(req, res) {
  let data = await req.user;
  res.status(200).send({ success: true, data: data });
}

async function getAllUser(req, res) {
  let users = await User.find({}).select("-passwordHash");
  if (users) {
    res.status(200).send({ sucess: true, data: users });
  } else {
    res.status(400).send({ sucess: false, message: "not found users" });
  }
}

async function resendCode(req, res) {
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
}

async function verifyEmail(req, res) {
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
}

async function isPasswordPwned(password) {
  const sha1pwd = await sha1(password);
  const head = sha1pwd.slice(0, 5);
  const tail = sha1pwd.slice(5);

  const url = `https://api.pwnedpasswords.com/range/${head}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching "${url}": ${response.status}`);
  }

  const hashes = await response.text();
  const count = extractCountFromHashes(hashes, tail);

  return count > 0;
}

async function sha1(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.toUpperCase();
}

function extractCountFromHashes(hashes, tail) {
  const lines = hashes.split("\n");
  for (const line of lines) {
    const [hash, count] = line.split(":");
    if (hash === tail) {
      return parseInt(count, 10);
    }
  }
  return 0;
}

module.exports = {
  register,
  login,
  deleteUser,
  getUser,
  me,
  getAllUser,
  resendCode,
  verifyEmail,
};

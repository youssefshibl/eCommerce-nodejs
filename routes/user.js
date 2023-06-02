const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth_middleware = require("../middleware/auth");

const User = require("../models/User");

router.post("/register", async (req, res) => {
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
    return res.status(400).send("User with given Email not found");
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
    res.status(400).send("Password is mismatch");
  }
});

// delete user
router.delete("/:id", auth_middleware, async (req, res) => {
  let id = req.params.id;

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
  let user = await User.findById(req.params.id).select("-passwordHash");
  console.log(user);
  if (user) {
    res.status(200).send({ sucess: true, user: user });
  } else {
    res.status(400).send({ sucess: false, message: "user not found" });
  }
});

// get all user
router.get("/me", auth_middleware, async (req, res) => {
    let data = await req.user
  res.status(200).send({success:true , data: data});
});
router.get("/", auth_middleware, async (req, res) => {
  let users = await User.find({}).select("-passwordHash");
  if (users) {
    res.status(200).send({ sucess: true, data: users });
  } else {
    res.status(400).send({ sucess: false, message: "not found users" });
  }
});

module.exports = router;

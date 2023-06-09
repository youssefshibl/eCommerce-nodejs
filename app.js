const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
let api = process.env.API_URL;

// root Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// get all routes file
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/categories");
const cart = require("./routes/cart");
const order = require("./routes/order")

// routes
app.use(`${api}/users`, userRoute);
app.use(`${api}/product`, productRoute);
app.use(`${api}/categories`, categoryRoute);
app.use(`${api}/cart`, cart);
app.use(`${api}/order`, order);

// make connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000");
  });
});

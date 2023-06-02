const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
let api = process.env.API_URL;


// root Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// get all routes file
const userRoute = require("./routes/user");

// routes
app.use(`${api}/users`, userRoute);


// make connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/test").then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000");
  });
});

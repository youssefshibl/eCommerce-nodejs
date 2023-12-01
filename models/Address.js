const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
    min: 6,
    max: 200,
  },
  city: {
    type: String,
    required: true,
    min: 6,
    max: 200,
  },
  postalCode: {
    type: String,
    required: true,
    min: 6,
    max: 200,
  },
  country: {
    type: String,
    required: true,
    min: 6,
    max: 200,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

let Address = mongoose.model("Address", addressSchema);

module.exports = Address;
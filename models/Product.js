const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: "0",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

// make addation proberity called id 
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});


// active this proberity in json object
productSchema.set('toJSON', {
    virtuals:true,
});

module.exports = mongoose.model("Product", productSchema);


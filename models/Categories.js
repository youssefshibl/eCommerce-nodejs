const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  image: {
    type: String,
    default: "",
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

module.exports = mongoose.model("Category", categorySchema);

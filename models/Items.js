const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Item", ItemSchema);

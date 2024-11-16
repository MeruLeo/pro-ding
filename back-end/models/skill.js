const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  bg: {
    type: String,
    default: "#0FBF4C",
  },
});

module.exports = mongoose.model("Skill", schema);

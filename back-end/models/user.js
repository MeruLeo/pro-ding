const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      uniqie: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    // skills: [
    //   {
    //     type: String,
    //     required: true,
    //   },
    // ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", schema);

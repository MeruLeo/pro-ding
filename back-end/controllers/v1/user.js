const userModel = require("../../models/user");
const fs = require("fs");

exports.getMe = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getAvatar = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user.avatar);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.setAvatar = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { avatar: req.file.filename },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.changeAvatar = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { avatar: req.file.filename },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

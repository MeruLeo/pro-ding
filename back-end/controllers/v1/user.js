const userModel = require("../../models/user");
const fs = require("fs");
const path = require("path");

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
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const avatarsPath = path.join(
      __dirname,
      "..",
      "..",
      "front-end",
      "public",
      "imgs",
      "avatars",
    );

    if (user.avatar) {
      const previousAvatarPath = path.join(avatarsPath, user.avatar);
      if (fs.existsSync(previousAvatarPath)) {
        fs.unlinkSync(previousAvatarPath);
      }
    }

    user.avatar = req.file.filename;
    await user.save();

    res.json({ msg: "Avatar updated successfully", avatar: user.avatar });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.editInfo = async (req, res) => {
  const { field } = req.params;
  const { value } = req.body;

  if (!field || !value) {
    return res.status(400).json({ msg: "Invalid request" });
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { [field]: value },
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

exports.toggleAccountStatus = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      { isActive: !req.user.isActive },
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

exports.deleteAccount = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const skillModel = require("../../models/skill");

exports.create = async (req, res) => {
  const { name, bg, isActive } = req.body;

  try {
    const skill = await skillModel.create({ name, bg, isActive });

    res.status(201).json(skill);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create skill",
      error: err.message,
    });
  }
};

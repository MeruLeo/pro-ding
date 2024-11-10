const projectModel = require("../models/project");

module.exports = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const projectId = req.params.projectId || req.body.projectId;

    if (!projectId) {
      return res.status(400).json({
        msg: "Project id is required",
      });
    }

    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({
        msg: "Project not found",
      });
    }

    if (project.owner.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ msg: "Access denied: You are not the project owner" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: "Internal server error", error: err });
  }
};

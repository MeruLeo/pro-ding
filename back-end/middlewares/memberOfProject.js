const projectModel = require("../models/project");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const projectId = req.params.projectId || req.body.projectId;

        if (!projectId) {
            return res.status(400).json({
                msg: "project id is required",
            });
        }
        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({
                msg: "Project not found",
            });
        }

        if (
            !project.members.includes(userId.toString()) &&
            project.owner.toString() !== userId.toString()
        ) {
            return res.status(403).json({
                msg: "Access denied: You are not a member or the owner of this project",
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: "شما عضو این پروژه نیستید",
            error: err.message,
        });
    }
};

const projectModel = require("../models/project");

module.exports = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const project = req.params.project || req.body.project;

        if (!project) {
            return res.status(400).json({
                msg: "آیدی پروژه الزامی است",
            });
        }

        const mainProject = await projectModel.findById(project);
        if (!mainProject) {
            return res.status(404).json({
                msg: "Project not found",
            });
        }

        if (mainProject.owner.toString() !== userId.toString()) {
            return res
                .status(403)
                .json({ msg: "Access denied: You are not the project owner" });
        }

        next();
    } catch (err) {
        res.status(500).json({ msg: "Internal server error", error: err });
    }
};

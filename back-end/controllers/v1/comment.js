const commentModel = require("../../models/comment");
const projectModel = require("../../models/project");

exports.create = async (req, res) => {
    const { subject, body, parent, project } = req.body;

    try {
        const mainProject = await projectModel.findById(project);
        if (!mainProject) {
            return res.status(404).json({
                msg: "Project not found",
            });
        }

        const comment = await commentModel.create({
            subject,
            body,
            parent,
            project: mainProject._id,
            sender: req.user._id,
        });

        res.status(200).json(comment);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to create comment",
            error: err.message,
        });
    }
};

exports.getAll = async (req, res) => {
    const { project } = req.body;

    try {
        const mainProject = await projectModel.findById(project);
        if (!mainProject) {
            return res.status(404).json({
                msg: "Project not found",
            });
        }

        const comments = await commentModel.find({ project: mainProject._id });

        res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to get comments",
            error: err.message,
        });
    }
};

exports.getOne = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found",
            });
        }

        res.status(200).json(comment);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to get comment",
            error: err.message,
        });
    }
};

exports.remove = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await commentModel.findByIdAndDelete(commentId);
        if (!comment) {
            return res.status(404).json({
                msg: "Comment not found",
            });
        }

        res.status(200).json({
            msg: "Comment removed successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to remove comment",
            error: err.message,
        });
    }
};

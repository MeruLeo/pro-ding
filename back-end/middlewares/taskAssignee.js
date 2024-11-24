const userModel = require("../models/user");
const taskModel = require("../models/task");
const projectModel = require("../models/project");

module.exports = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const taskId = req.params.taskId || req.body.taskId;

        if (!taskId) {
            return res.status(400).json({
                message: "Task id is required",
            });
        }

        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        const project = await projectModel.findById(task.project);
        if (!project) {
            return res.status(404).json({
                message: "Project not found for this task",
            });
        }

        if (
            task.assignee.toString() !== userId.toString() &&
            project.owner.toString() !== userId.toString()
        ) {
            return res.status(403).json({
                message:
                    "خطای دسترسی ؛ شما انجام دهنده این تسک یا مالک پروژه نیستید",
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Failed to access task",
            error: err.message,
        });
    }
};

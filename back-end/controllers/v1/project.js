const projectModel = require("../../models/project");
const userModel = require("../../models/user");
const taskModel = require("../../models/task");
const commentModel = require("../../models/comment");

exports.create = async (req, res) => {
    const { name, description, startDate, endDate, members } = req.body;
    const icon = req.file.filename;

    try {
        const existProject = await projectModel.findOne({ name });
        if (existProject) {
            return res.status(409).json({ msg: "Project already exists" });
        }

        const project = await projectModel.create({
            name,
            description,
            startDate,
            endDate,
            members,
            icon,
            owner: req.user._id,
            tasks: [],
        });

        return res.status(201).json({ project });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to create project",
            error: err.message,
        });
    }
};

exports.getProjectInfo = async (req, res) => {
    const { projectId } = req.params;
    try {
        const project = await projectModel
            .findById(projectId)
            .populate("members", "-password")
            .populate("owner", "-password")
            .populate("tasks", "-__v");

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        const comments = await commentModel
            .find({
                project: projectId,
            })
            .populate("sender", "username name avatar");

        const buildCommentsTree = (parentId = null) => {
            return comments
                .filter(
                    (comment) => String(comment.parent) === String(parentId),
                )
                .map((comment) => ({
                    id: comment._id,
                    subject: comment.subject,
                    content: comment.body,
                    sender: [
                        comment.sender.username,
                        comment.sender.name,
                        comment.sender.avatar,
                    ],
                    replays: buildCommentsTree(comment._id),
                    createdAt: comment.createdAt,
                }));
        };

        const allComments = buildCommentsTree();

        return res.status(200).json({ project, allComments });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to get project info",
            error: err.message,
        });
    }
};

exports.getProjectsWithStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const projects = await projectModel
            .find({ status })
            .populate("owner", "-password")
            .populate("members", "-password");
        if (!projects) {
            return res
                .status(404)
                .json({ msg: "No projects found with this status" });
        }

        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to get projects with status",
            error: err.message,
        });
    }
};

exports.addMember = async (req, res) => {
    const { userId } = req.params;
    const { projectId } = req.body;

    try {
        const project = await projectModel.findByIdAndUpdate(
            projectId,
            { $push: { members: userId } },
            { new: true },
        );

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to add member to project",
            error: err.message,
        });
    }
};

exports.removeMember = async (req, res) => {
    const { userId } = req.params;
    const { projectId } = req.body;

    try {
        const project = await projectModel.findByIdAndUpdate(
            projectId,
            { $pull: { members: userId } },
            { new: true },
        );

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to remove member from project",
            error: err.message,
        });
    }
};

exports.edit = async (req, res) => {
    const { projectId, field } = req.params;
    const { value } = req.body;

    const allowedFields = [
        "avatar",
        "name",
        "description",
        "startDate",
        "endDate",
    ];

    try {
        if (!allowedFields.includes(field)) {
            return res
                .status(400)
                .json({ msg: "Field not allowed to be edited" });
        }

        const project = await projectModel.findByIdAndUpdate(
            projectId,
            { [field]: value },
            { new: true },
        );

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to edit project",
            error: err.message,
        });
    }
};

exports.changeStatus = async (req, res) => {
    const validStatuses = ["تعویق", "برنامه ریزی", "انجام شده", "لغو شده"];
    const { projectId, status } = req.body;

    try {
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ msg: "Invalid status value" });
        }

        const project = await projectModel.findByIdAndUpdate(
            projectId,
            { status },
            { new: true },
        );

        if (!project) {
            return res.status(404).json({ msg: "Project not found" });
        }

        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to change project status",
            error: err.message,
        });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const userId = req.user._id;
        const projects = await projectModel
            .find({
                $or: [{ owner: userId }, { members: { $in: [userId] } }],
            })
            .populate("owner", "-password")
            .populate("members", "-password")
            .populate("tasks", "-__v");

        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({
            message: "Failed to get all projects",
            error: err.message,
        });
    }
};

exports.showProgress = async (req, res) => {
    const { project } = req.body;

    try {
        const mainProject = await projectModel
            .findById(project)
            .populate("tasks");
        if (!mainProject) {
            return res.status(404).json({
                msg: "Project not found",
            });
        }

        const totalTasks = mainProject.tasks.length;
        const completedTasks = mainProject.tasks.filter(
            (task) => task.isComplete === true,
        ).length;

        const progress = Math.round((completedTasks / totalTasks) * 100);
        return res.status(200).json({ progress });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to calculate project progress",
            error: err.message,
        });
    }
};

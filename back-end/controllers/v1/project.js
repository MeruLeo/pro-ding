const projectModel = require("../../models/project");

exports.create = async (req, res) => {
  const { name, description, startDate, endDate, members } = req.body;

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
  const { projectId } = req.body;
  try {
    const project = await projectModel
      .findById(projectId)
      .populate("members", "-password");

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    return res.status(200).json(project);
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
  const { projectId } = req.body;
  const { name, description, startDate, endDate, members } = req.body;

  try {
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.name = name || project.name;
    project.description = description || project.description;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.members = members || project.members;

    const updatedProject = await project.save();

    return res.status(200).json({ project: updatedProject });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to edit project",
      error: err.message,
    });
  }
};

const validStatuses = ["تعویق", "برنامه ریزی", "انجام شده", "لغو شده"];

exports.changeStatus = async (req, res) => {
  const { projectId, status } = req.body;

  try {
    // بررسی اینکه آیا status معتبر است یا خیر
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: "Invalid status value" });
    }

    // بروزرسانی وضعیت پروژه
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

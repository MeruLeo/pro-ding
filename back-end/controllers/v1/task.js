const taskModel = require("../../models/task");
const projectModel = require("../../models/project");

exports.create = async (req, res) => {
  const { title, description, startDate, projectId, assignee } = req.body;

  try {
    const project = await projectModel.findById(projectId).select("members");
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    if (!project.members.includes(assignee)) {
      return res
        .status(400)
        .json({ msg: "Assignee is not a member of the project" });
    }

    const task = await taskModel.create({
      title,
      description,
      startDate,
      project: projectId,
      assignee,
    });

    await projectModel.findByIdAndUpdate(
      projectId,
      {
        $push: { tasks: task._id },
      },
      {
        new: true,
      },
    );

    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create task",
      error: err.message,
    });
  }
};

exports.getTasksFromProject = async (req, res) => {
  const { projectId } = req.body;

  try {
    const tasks = await taskModel
      .find({ project: projectId })
      .populate("assignee", "-password")
      .populate("project");

    if (!tasks) {
      return res.status(404).json({ msg: "No tasks found for this project" });
    }

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to get tasks from project",
      error: err.message,
    });
  }
};

exports.getTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to get task",
      error: err.message,
    });
  }
};

exports.toggleComplite = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.isComplite = !task.isComplite;
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to toggle compltion task",
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskModel.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    await projectModel.findByIdAndUpdate(
      task.project,
      {
        $pull: { tasks: taskId },
      },
      {
        new: true,
      },
    );

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete task",
      error: err.message,
    });
  }
};

exports.toggleActivity = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.isActive = !task.isActive;
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to toggle activity task",
      error: err.message,
    });
  }
};
const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isOwnerMiddleware = require("../../middlewares/projectOwner");
const taskCtrller = require("../../controllers/v1/task");
const isAssigneeMiddleware = require("../../middlewares/taskAssignee");

const router = express.Router();

router.route("/").post(authMiddleware, isOwnerMiddleware, taskCtrller.create);

router
    .route("/:projectId")
    .get(authMiddleware, taskCtrller.getTasksFromProject);

router.route("/user-tasks").get(authMiddleware, taskCtrller.getUserTasks);

router
    .route("/:taskId")
    .get(authMiddleware, isOwnerMiddleware, taskCtrller.getTask)
    .put(authMiddleware, isAssigneeMiddleware, taskCtrller.toggleComplete)
    .delete(authMiddleware, isOwnerMiddleware, taskCtrller.delete);

router
    .route("/:taskId/toggle-activity")
    .put(authMiddleware, isOwnerMiddleware, taskCtrller.toggleActivity);

router
    .route("/task-island")
    .get(authMiddleware, isAssigneeMiddleware, taskCtrller.taskIsland);

module.exports = router;

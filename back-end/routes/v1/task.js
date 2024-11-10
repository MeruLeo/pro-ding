const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const isOwnerMiddleware = require("../../middlewares/projectOwner");
const taskCtrller = require("../../controllers/v1/task");
const isAssigneeMiddleware = require("../../middlewares/taskAssignee");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isOwnerMiddleware, taskCtrller.create)
  .get(authMiddleware, isAssigneeMiddleware, taskCtrller.getTasksFromProject);

router
  .route("/:taskId")
  .get(authMiddleware, isOwnerMiddleware, taskCtrller.getTask)
  .put(authMiddleware, isOwnerMiddleware, taskCtrller.toggleComplite)
  .delete(authMiddleware, isOwnerMiddleware, taskCtrller.delete);

router
  .route("/:taskId/toggle-activity")
  .put(authMiddleware, isOwnerMiddleware, taskCtrller.toggleActivity);

module.exports = router;
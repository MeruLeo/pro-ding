const express = require("express");
const projectCtrller = require("../../controllers/v1/project");
const authMiddleware = require("../../middlewares/auth");
const isOwnerMiddleware = require("../../middlewares/projectOwner");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, projectCtrller.create)
  .get(authMiddleware, projectCtrller.getProjectInfo)
  .put(authMiddleware, isOwnerMiddleware, projectCtrller.edit);

router
  .route("/:status")
  .get(authMiddleware, projectCtrller.getProjectsWithStatus);

router
  .route("/change-status")
  .put(authMiddleware, isOwnerMiddleware, projectCtrller.changeStatus);

router
  .route("/:userId")
  .post(authMiddleware, isOwnerMiddleware, projectCtrller.addMember)
  .delete(authMiddleware, isOwnerMiddleware, projectCtrller.removeMember);

module.exports = router;

const express = require("express");
const projectCtrller = require("../../controllers/v1/project");
const authMiddleware = require("../../middlewares/auth");
const isOwnerMiddleware = require("../../middlewares/projectOwner");
const multer = require("multer");
const multerStorage = require("../../utils/projectIconUploader");

const router = express.Router();

router
    .route("/")
    .post(
        authMiddleware,
        multer({
            storage: multerStorage,
            limits: { fileSize: 1000000000 },
        }).single("icon"),
        projectCtrller.create,
    )
    .get(authMiddleware, projectCtrller.getProjectInfo);

router.route("/getAll").get(authMiddleware, projectCtrller.getAllProjects);

router
    .route("/:status")
    .get(authMiddleware, projectCtrller.getProjectsWithStatus);

router
    .route("/:projectId/:field")
    .put(authMiddleware, isOwnerMiddleware, projectCtrller.edit);

router
    .route("/change-status")
    .put(authMiddleware, isOwnerMiddleware, projectCtrller.changeStatus);

router
    .route("/:userId")
    .post(authMiddleware, isOwnerMiddleware, projectCtrller.addMember)
    .delete(authMiddleware, isOwnerMiddleware, projectCtrller.removeMember);

module.exports = router;

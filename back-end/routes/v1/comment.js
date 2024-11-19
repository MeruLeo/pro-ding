const express = require("express");
const commentCtrller = require("../../controllers/v1/comment");
const authMiddleware = require("../../middlewares/auth");
const isMemberOfProject = require("../../middlewares/memberOfProject");
const isOwnerMiddleware = require("../../middlewares/projectOwner");

const router = express.Router();

router
    .route("/")
    .post(authMiddleware, isMemberOfProject, commentCtrller.create)
    .get(authMiddleware, isMemberOfProject, commentCtrller.getAll);

router
    .route("/:commentId")
    .get(authMiddleware, isMemberOfProject, commentCtrller.getOne)
    .delete(authMiddleware, isOwnerMiddleware, commentCtrller.remove);

module.exports = router;

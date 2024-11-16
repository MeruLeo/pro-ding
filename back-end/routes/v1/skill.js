const express = require("express");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const authMiddleware = require("../../middlewares/auth");
const skillCtrller = require("../../controllers/v1/skill");

const router = express.Router();

router.route("/").post(authMiddleware, isAdminMiddleware, skillCtrller.create);

module.exports = router;

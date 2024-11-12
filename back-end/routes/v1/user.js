const express = require("express");
const userCtrller = require("../../controllers/v1/user");
const authMiddleware = require("../../middlewares/auth");

const router = express.Router();

router.route("/").get(authMiddleware, userCtrller.getMe);

module.exports = router;

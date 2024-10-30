const express = require("express");
const authCtrller = require("../../controllers/v1/auth");

const router = express.Router();

router.route("/login").post(authCtrller.login);
router.route("/register").post(authCtrller.register);

module.exports = router;

const express = require("express");
const authCtrller = require("../../controllers/v1/auth");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");

const router = express.Router();

router.route("/login").post(authCtrller.login);
router
  .route("/register")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "avatar",
    ),
    authCtrller.register,
  );

module.exports = router;

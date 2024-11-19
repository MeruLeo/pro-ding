const express = require("express");
const userCtrller = require("../../controllers/v1/user");
const authMiddleware = require("../../middlewares/auth");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");

const router = express.Router();

router.route("/").get(authMiddleware, userCtrller.getMe);

router
  .route("/settings")
  .put(authMiddleware, userCtrller.toggleAccountStatus)
  .delete(authMiddleware, userCtrller.deleteAccount);

router.route("/:field").put(authMiddleware, userCtrller.editInfo);

router
  .route("/avatar")
  .get(authMiddleware, userCtrller.getAvatar)
  .post(
    authMiddleware,
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "avatar",
    ),
    userCtrller.setAvatar,
  )
  .put(
    authMiddleware,
    multer({ storage: multerStorage, limits: { fileSize: 1000000000 } }).single(
      "avatar",
    ),
    userCtrller.changeAvatar,
  );

module.exports = router;

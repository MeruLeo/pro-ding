// *ورودی های هسته‌ای
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// *ورودی های برنامه برای تنظیم روت روی درخواست ها
const authRouter = require("./routes/v1/auth");

// *ساخت اپ
const app = express();

// *میان افزار های هسته‌ای
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// *میان افزار های روت ها
app.use("/v1/auth", authRouter);

module.exports = app;

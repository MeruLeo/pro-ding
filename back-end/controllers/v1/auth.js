const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerValidator = require("../../validators/register");

exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return res.status(401).json({
        message: "There is no user with this email or username",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Password in not valid !!",
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      message: "Logged in successfully",
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Error Logging in",
      error: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const validationResult = registerValidator(req.body);
    if (!validationResult) {
      return res.status(422).json(validationResult);
    }

    const { username, password, email, name, bio } = req.body;

    const existedUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res.status(409).json({
        msg: "Username or email already exists",
      });
    }

    const countOfUsers = await userModel.countDocuments();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword,
      email,
      bio,
      name,
      role: countOfUsers > 0 ? "user" : "admin",
      isActive: true,
      // avatar: req.file.filename,
    });

    // !حذف پسوورد از اطلاعات بازگشتی کاربر وقتی ثبت نام موفقیت آمیز بود
    const userWithoutPassword = user.toObject();
    Reflect.deleteProperty(userWithoutPassword, "password");

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({ user: userWithoutPassword, accessToken });
  } catch (err) {
    return res.status(500).json({
      msg: "Error registering",
      error: err.message,
    });
  }
};

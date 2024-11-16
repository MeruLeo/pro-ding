module.exports = async (req, res, next) => {
  const isAdmin = req.user.role === "admin";
  if (!isAdmin) {
    return res
      .status(403)
      .json({ message: "Unauthorized to access this route" });
  }

  next();
};

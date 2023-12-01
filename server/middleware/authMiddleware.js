const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized, user not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = { protect };

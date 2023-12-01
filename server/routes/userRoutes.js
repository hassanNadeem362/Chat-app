const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  fetchUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/fetch-user", protect, fetchUser);

module.exports = router;

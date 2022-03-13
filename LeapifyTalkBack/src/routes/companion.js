const express = require("express");
const router = express.Router();
const {
  signUp,
  forgotPassword,
  forgotPasswordVerify,
  resetPassword,
  login,
  verifyMail,
  logout,
} = require("../controllers/companion");
const { auth } = require("../middlewares/auth");

router.post("/sign-up", signUp);
router.get("/verify-email/:token", verifyMail);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", forgotPasswordVerify);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;

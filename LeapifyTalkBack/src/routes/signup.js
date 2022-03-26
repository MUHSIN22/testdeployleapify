const express = require("express");
const router = express.Router();
const {
  signUpCompanion,
  signUpDoctor,
  signUpUser,
  forgotPassword,
  forgotPasswordVerify,
  resetPassword,
  login,
  verifyMail,
  logout,
  companionHome,
} = require("../controllers/companion");
const { auth } = require("../middlewares/auth");

router.post("/companion", signUpCompanion);
router.post("/doctor", signUpDoctor);
router.post("/user", signUpUser);
router.get("/verify-email/:token", verifyMail);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", forgotPasswordVerify);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.post("/logout", auth, logout);

router.get("/home", auth, companionHome);

module.exports = router;

require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const sendmail = require("../utils/sendmail");
const companion = require("../models/companion");

// =========================sign up==================

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const validateEmail = await companion.findOne({ email }).exec();
    if (validateEmail) {
      res.json({ status: "error", msg: "Email ID already taken" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      let registerToken = crypto.randomBytes(64).toString("hex");
      const hashPassword = bcrypt.hash(password, salt).then(async (rec) => {
        const account = await companion.create({
          name,
          email,
          password: rec,
          registerToken,
          role: "companion",
        });
      });
      const msg = {
        from: `Banao <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: "Banao Verify Link",
        text: `
            Hello  , your request for reactivation is confirmed
            please click on the link to verify your email
            ${process.env.CLIENT_URI}/verify-reset-password/${registerToken}
            `,
        html: `
            hello, your request for reactivation is confirmed
            please click on the link to verify your email
            <a href="http://localhost:5000/api/companion/verify-email/${registerToken}">Verify Email</a>
            `,
      };
      sendmail(msg);
      res.json({
        status: "ok",
        msg: "Check you email to confirm registration",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ e });
  }
};

// =========================sign up=========================

// ==========================verify email===============

exports.verifyMail = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  try {
    const updatedUser = await companion.findOneAndUpdate(
      { registerToken: token },
      { $set: { registerToken: null, isVerified: true } }
    );
    // console.log(updatedUser);
    if (!updatedUser) {
      return res.json({
        status: "error",
        msg: "email token is invalid or expired",
      });
    }
    // return res.redirect(`${process.env.CLIENT_URI}/login`)
    return res.json({ status: "ok", msg: "Email verified Successfully" });
  } catch (error) {
    console.log(error);
    // return res.redirect(`${process.env.CLIENT_URI}/login`)
    return res.json({ status: "error", msg: error });
  }
};
//=================== Verify mail ===========================================

// =========================forgot password==================

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await companion.findOne({ email });
  if (!user) {
    return res.json({
      status: "error",
      msg: "No user with this email",
    });
  }
  let token = crypto.randomBytes(64).toString("hex");
  user.resetPasswordToken = token;
  await user.save();

  try {
    const msg = {
      from: `Banao <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Reset password link",
      text: `
            hello, your request for reactivation is confirmed
            please click on the link to reset your passwrod
            ${process.env.URI}/forgot-password/${token}
            `,
      html: `
            hello, your request for reactivation is confirmed
            please click on the link to reset your passwrod
            <a href="${process.env.URI}/api/companion/forgot-password/${token}"> reset password </a>
            `,
    };
    sendmail(msg);

    return res.json({
      status: "ok",
      msg: "check your email for further information",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Some thing went wrong, contact us for assistance",
    });
  }
};

// =========================forgot password========================

// ===================forgot password verify======================

exports.forgotPasswordVerify = async (req, res) => {
  const { token } = req.params;
  try {
    let user = await companion.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.json({
        status: "error",
        msg: "Token is invalid or expired",
      });
    }
    await companion.findOneAndUpdate(
      { resetPasswordToken: token },
      { $set: { verifiedForPasswordReset: true } }
    );
    // redirect to reset password page
    return res.json({
      status: "ok",
      msg: "verified",
      emailToken: token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      msg: "Token is invalid or expired",
    });
  }
};
//=================== Forgot Password Verfiy ===========================================

//=================== Reset Password ===========================================
exports.resetPassword = async (req, res) => {
  const { new_password, confirm_password, token } = req.body;
  try {
    const user = await companion.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.json({
        status: "error",
        msg: "Invalid token or token is expired",
      });
    }
    // if (!user.verifiedForPasswordReset) {
    //   return res.json({
    //     status: "error",
    //     msg: "You have no permissions",
    //   });
    // }
    if (token !== user.resetPasswordToken || user.resetPasswordToken === null) {
      return res.json({
        status: "error",
        msg: "token is not valid or expired",
      });
    }

    if (new_password !== confirm_password) {
      res.json({ status: "error", msg: "password does not match" });
    }
    const password = await bcrypt.hash(new_password, 10);
    await companion.findOneAndUpdate(
      { emailToken: token },
      { $set: { password: password, emailToken: null } }
    );
    return res.json({
      status: "ok",
      msg: "password changed successfullly",
    });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error", msg: "something went wrong" });
  }
};
//=================== Reset Psssword ===========================================

//=================== Login ===========================================
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const user = await companion.findOne({ email }).lean();
  if (!user) {
    return res.json({
      status: "error",
      msg: "User Not Found",
    });
  }
  console.log(user);
  if (!(await bcrypt.compare(password, user.password))) {
    return res.json({
      status: "error",
      msg: "Invalid email or password",
    });
  }

  if (!user.isVerified) {
    return res.json({
      status: "error",
      msg: "Please verify Your Email",
    });
  }
  try {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    await companion.findOneAndUpdate(
      { email },
      {
        tokens: token,
      }
    );
    return res.json({
      status: "ok",
      msg: "Logged in Successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "something went wrong",
    });
  }
};
//=================== Login ===========================================

//=================== Logout ===========================================
exports.logout = async (req, res) => {
  try {
    const user = req.user;
    console.log(user.email);
    companion.findOneAndUpdate(
      { email: user.email },
      { $set: { tokens: "" } },
      (err, result) => {
        if (err) console.log(err);
        console.log(result);
      }
    );

    return res.json({ status: "ok", msg: "successfully logged out" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error" });
  }
};
//=================== Logout ===========================================

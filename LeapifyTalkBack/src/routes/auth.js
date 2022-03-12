const express = require("express");
const router = new express.Router();
const upload = require("../utils/s3");
const { auth } = require("../middlewares/auth");
const {
  // -----------------------------
  usersignup, userdata, doctorupdate, aboutmeupdate, task, taskdata, updatetask, deletetask, specupdate, addblog, blogdata, deleteblog, patientupdate, settimeperiod, shiftdata, updatetimeperiod, doctorprice, pricedata, doctorupdateprice, doctorsdata, mapping, assessment, booking, bookdata, bookingData, bookingCancel, bookingReschedule, bookingStatus, bookingDataById, appointmentDone, feedback, feedbackdata, doctorMeetStatus, D_feedbackdata, fav_unfav, a_result, addnote, 
  // -----------------------------
  register,
  login,
  logout,
  forgotPassword,
  forgotPasswordVerify,
  resetPassword,
  editProfile,
  verifyMail,
  getRooms,
  enrollCourse,
  getDetails
} = require("../controllers/auth");
// -------------------------------------------------
// -------------------------------------------------
router.post("/usersignup", usersignup);
router.post("/userdata", userdata);
router.post("/doctorsdata", doctorsdata);
// ===============================================
router.post("/feedback", feedback);
router.post("/D_feedbackdata", D_feedbackdata);
router.post("/feedbackdata", feedbackdata);
router.post("/fav_unfav", fav_unfav);
// ===============================================
router.post("/bookingStatus", bookingStatus);
router.post("/appointmentDone", appointmentDone);
router.post("/bookingDataById", bookingDataById);
router.post("/bookingReschedule", bookingReschedule);
router.post("/bookingCancel", bookingCancel);
router.post("/bookdata", bookdata);
router.post("/bookingData", bookingData);
router.post("/addnote", upload.single("file"), addnote);
router.post("/booking", booking);
// ===============================================
router.get("/mapping", mapping);
// ===============================================
router.post("/patientupdate", upload.single("file"), patientupdate);
router.post("/doctorupdate", upload.single("file"), doctorupdate);
router.post("/a_result", a_result);
router.post("/assessment", assessment);
router.post("/aboutmeupdate", aboutmeupdate);
// ===============================================
router.post("/addblog", upload.single("file"), addblog);
router.post("/blogdata", blogdata);
router.post("/deleteblog", deleteblog);
// ===============================================
router.post("/task", task);
router.post("/taskdata", taskdata);
router.post("/updatetask", updatetask);
router.post("/deletetask", deletetask);
// ===============================================
router.post("/settimeperiod", settimeperiod);
router.post("/shiftdata", shiftdata);
router.post("/updatetimeperiod", updatetimeperiod);
// ===============================================
router.post("/doctorprice", doctorprice);
router.post("/pricedata", pricedata);
router.post("/doctorupdateprice", doctorupdateprice);
router.post("/doctorMeetStatus", doctorMeetStatus);
// ===============================================
// -------------------------------------------------
// -------------------------------------------------
router.post("/register", register);
router.get("/verify-email", verifyMail);
router.post("/login", login);
router.put("/edit-profile", auth, upload.single("photo"), editProfile);
router.post("/logout", auth, logout);
router.get('/edit-profile',getDetails)
// ============== Forgot Password ====================================

router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", forgotPasswordVerify);
router.post("/reset-password", resetPassword);

// ============== Forgot Password ====================================

router.get("/user/rooms", getRooms);
router.post("/enroll-course/:id", enrollCourse);

// ====================Student Dashboard======================

module.exports = router;

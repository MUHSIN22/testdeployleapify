const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Shift = require("../models/shift");
const Task = require("../models/task");
const Book = require("../models/booking");
const Feedback = require("../models/feedback");
const Blog = require("../models/blog");
const Mapp = require("../models/mapp");
const DoctorPrice = require("../models/doctor_price");
const chatRoom = require("../models/chatRoom");
const sendmail = require("../utils/sendmail");
const { customAlphabet } = require("nanoid");
const course = require("../models/course");
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

//=================== Doctor Register ===========================================
exports.usersignup = async (req, res) => {
  const {
    first_name,
    last_name,
    mobile,
    gender,
    address,
    image,
    role,
    paypalId,
    licenceimage,
    qualification,
    experience,
    licenceNo,
    aboutMe,
    department,
    expierenceDetails,
    specialitiesDetails,
    therapyDetails,
    age,
    email,
    password,
  } = req.body;

  // Hasing the passwords - we use bcrypt algorithm
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  emailToken = crypto.randomBytes(64).toString("hex");

  // Creating the user in the database
  try {
    const user = await User.create({
      first_name,
      last_name,
      mobile,
      gender,
      address,
      image,
      role,
      paypalId,
      licenceimage,
      qualification,
      experience,
      licenceNo,
      aboutMe,
      department,
      expierenceDetails,
      specialitiesDetails,
      therapyDetails,
      username: nanoid(),
      age,
      password: hash,
      email,
      emailToken,
    });
    await user.save();

    // email to be sent to the user
    const msg = {
      from: `Banao <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Verify your email to continue",
      text: `
               Please verify your email. 
                ${process.env.URI}/api/verify-email?token=${emailToken}
            `,
      html: `                    
                <a href="${process.env.URI}/api/verify-email?token=${emailToken}"> Verify email Address</a>

                ${process.env.URI}/api/verify-email?token=${emailToken}
                                            
            `,
    };

    const mail = sendmail(msg);
    // .then((rec) => res.json({ rec }))
    // .catch((e) => res.json({ e }));
    // return res.json({
    //   status: "ok",
    //   userId: user._id,
    // });
  } catch (error) {
    if (error.code === 11000 && error.errmsg.includes("email")) {
      return res.json({
        status: "error",
        msg: "email already exists",
      });
    }
    throw error;
  }
  return res.json({
    status: "ok",
    msg: "User registered Successfully, Check your email and verify it",
  });
};
//=================== Doctor Register ===========================================
// ---------------------- Collect mappingdata Data Start ---------------------------

exports.mapping = async (req, res) => {
  try {
    const data = await Mapp.find().lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// ---------------------- Collect mappingdata Data End -----------------------------
// ---------------------- Collect User Data By Email Start ---------------------------

exports.userdata = async (req, res) => {
  const { email } = req.body;
  // console.log(email,'Res');
  try {
    const data = await User.findOne({ email }).lean();
    // console.log(data,'UserData');
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// ---------------------- Collect User Data By Email End -----------------------------
// ---------------------- Update Doctor Data Start ---------------------------

exports.doctorupdate = async (req, res) => {
  const {
    email,
    mobile,
    experience,
    youtubelink,
    googlemeetlink,
    zoomlink,
    skypelink,
    facebooklink,
    instagramlink,
    twitterlink,
  } = req.body;
  const fileinfo = req.file;
  try {
    if (req.file == undefined) {
      const update = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            mobile: mobile,
            experience: experience,
            // youtubelink: youtubelink,
            googlemeetlink: googlemeetlink,
            zoomlink: zoomlink,
            skypelink: skypelink,
            facebooklink: facebooklink,
            instagramlink: instagramlink,
            twitterlink: twitterlink,
          },
        }
      );
    } else {
      const update = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            mobile: mobile,
            experience: experience,
            // youtubelink: youtubelink,
            googlemeetlink: googlemeetlink,
            zoomlink: zoomlink,
            skypelink: skypelink,
            facebooklink: facebooklink,
            instagramlink: instagramlink,
            twitterlink: twitterlink,
            image: fileinfo.location,
          },
        }
      );
    }
    return res.json({ status: "ok", msg: "Update Successfully" });
  } catch (error) {
    // console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Update Doctor Data End --------------------------------
// ---------------------- Update Patient Data Start ---------------------------

exports.patientupdate = async (req, res) => {
  const { email, gender, mobile, address } = req.body;
  const fileinfo = req.file;
  try {
    if (req.file == undefined) {
      const update = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            mobile: mobile,
            gender: gender,
            address: address,
          },
        }
      );
    } else {
      const update = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            mobile: mobile,
            address: address,
            image: fileinfo.location,
          },
        }
      );
    }
    return res.json({ status: "ok", msg: "Update Successfully" });
  } catch (error) {
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Update Patient Data End --------------------------------
// ---------------------- Add Patient Result Data Start ---------------------------

exports.assessment = async (req, res) => {
  const { email, result } = req.body;
  try {
    const Result = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          result: result,
        },
      }
    );
    return res.json({ status: "ok", msg: "Add Result Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

exports.a_result = async (req, res) => {
  const { Email } = req.body;
  try {
    const data = await User.findOne({ email: Email }).lean();
    return res.json(data.result[29]);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Add Patient Result Data End --------------------------------
// ---------------------- Add Doctor Blog Data Start ---------------------------

exports.addblog = async (req, res) => {
  const { email, name, date, blogtitle, blogcontent } = req.body;
  const fileinfo = req.file;
  try {
    const blog = await Blog.create({
      email,
      name,
      date,
      blogtitle,
      blogcontent,
      image: fileinfo.location,
    });
    await blog.save();
    return res.json({ status: "ok", msg: "Add Blog Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Add Doctor Blog Data End ----------------------------
// ---------------------- Collect Blog Data By Email Start ---------------------------

exports.blogdata = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await Blog.find({ email }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// ---------------------- Collect Blog Data By Email End -----------------------------
// ---------------------- Delete Blog Data By Id Start ---------------------------

exports.deleteblog = async (req, res) => {
  var myquery = { _id: req.body.id };
  try {
    const deletedata = await Blog.deleteOne(myquery);
    return res.json({ status: "ok", msg: "Delete Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- delete Blog Data By Id End ----------------------------
// --------------------------- Doctor AboutMe Update Start -------------------------------------
exports.aboutmeupdate = async (req, res) => {
  const { email, aboutMe } = req.body;
  try {
    const update = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          aboutMe: aboutMe,
        },
      }
    );
    return res.json({ status: "ok", msg: "Update Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Doctor AboutMe Update End -------------------------------------
// -------------------------------- Task Create Start --------------------------------
exports.task = async (req, res) => {
  const { email, check, note } = req.body;
  try {
    const task = await Task.create({
      email,
      check,
      note,
    });

    await task.save();
    return res.json(data);
  } catch {
    return res.json({
      status: "error",
      msg: "error",
    });
  }
};
// -------------------------------- Task Create End ----------------------------------

// ---------------------- Collect Task Data By Email Start ---------------------------

exports.taskdata = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await Task.find({ email }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// ---------------------- Collect Task Data By Email End -----------------------------
// ---------------------- Update Task Data Start ---------------------------

exports.updatetask = async (req, res) => {
  const { _id, check } = req.body;
  try {
    const update = await Task.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          check: check,
        },
      }
    );
    return res.json({ status: "ok", msg: "Update Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Update Task Data End ----------------------------
// ---------------------- Delete Task Data Start ---------------------------

exports.deletetask = async (req, res) => {
  var myquery = { _id: req.body.id };
  try {
    const deletedata = await Task.deleteOne(myquery);
    return res.json({ status: "ok", msg: "Delete Successfully" });
    // res.json(deletedata);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- delete Task Data End ----------------------------
// -------------------------------- Feedback Appointment Start ----------------------------------
exports.feedback = async (req, res) => {
  const { P_email, D_email, P_name, D_name, C_Date, Rating, Message, Status } =
    req.body;
  try {
    const feedback = await Feedback.create({
      P_email: P_email,
      D_email: D_email,
      P_name: P_name,
      D_name: D_name,
      C_Date: C_Date,
      Rating: Rating,
      Message: Message,
      Status: Status,
    });
    await feedback.save();
    return res.json({ status: "ok", msg: "Feedback Successfully" });
  } catch {
    return res.json({
      status: "error",
      msg: "error",
    });
  }
};
// -------------------------------- Feedback Appointment End ------------------------------------
// ---------------------- Collect Feedback Appointment Data By Email Start ---------------------------

exports.feedbackdata = async (req, res) => {
  const { Email } = req.body;
  try {
    const data = await Feedback.find({ P_email: Email }).sort({ C_Date: -1 }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

exports.D_feedbackdata = async (req, res) => {
  const { Email } = req.body;
  try {
    const data = await Feedback.find({ D_email: Email }).sort({ C_Date: -1 }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// ---------------------- Collect Feedback Appointment Data By Email End -----------------------------
// ---------------------- Collect Doctor Price Start ---------------------
exports.doctorMeetStatus = async (req, res) => {
  const { Email } = req.body;
  try {
    const data = await DoctorPrice.findOne({ email: Email }).lean();
    // console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// ---------------------- Collect Doctor Price End --------------------------------
// ---------------------- fav_unfav Feedback Data Start ---------------------------

exports.fav_unfav = async (req, res) => {
  const { _id, Status } = req.body;
  try {
    const update = await Feedback.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Status: Status,
        },
      }
    );
    return res.json({ status: "ok", msg: "IsFavorite" });
    // console.log(update);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// --------------------------- fav_unfav Feedback Data End ----------------------------
// -------------------------------- Booking Appointment Start ----------------------------------
exports.booking = async (req, res) => {
  const {
    P_email,
    D_email,
    P_name,
    D_name,
    Price,
    Slot,
    Currentdate,
    SelectDate,
    Day,
    Bundle,
    MeetLink,
    Status,
  } = req.body;
  try {
    const book = await Book.create({
      P_email: P_email,
      D_email: D_email,
      P_name: P_name,
      D_name: D_name,
      Price: Price,
      Slot: Slot,
      Currentdate: Currentdate,
      SelectDate: SelectDate,
      Day: Day,
      Bundle: Bundle,
      MeetLink: MeetLink,
      Status: Status,
    });
    await book.save();
    return res.json({ status: "ok", msg: "Booking Successfully" });
  } catch {
    return res.json({
      status: "error",
      msg: "error",
    });
  }
};
// -------------------------------- Booking Appointment End ------------------------------------
// ---------------------- Collect Booking Data By Email Start ---------------------------

exports.bookdata = async (req, res) => {
  const { P_email } = req.body;
  try {
    const data = await Book.find({ P_email }).sort({ SelectDate: -1 }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

exports.bookingData = async (req, res) => {
  const { D_email } = req.body;
  try {
    const data = await Book.find({ D_email }).sort({ SelectDate: -1 }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

// ---------------------- Collect Booking Data By Email End -----------------------------
// ---------------------- Cancel Bokking Data Start ---------------------------

exports.bookingCancel = async (req, res) => {
  const { _id, Status } = req.body;
  try {
    const update = await Book.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Status: Status,
        },
      }
    );
    return res.json({ status: "ok", msg: "Cancel Successfully" });
    // console.log(update);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Cancel Booking Data End ----------------------------
// ---------------------- Reschedule Bokking Data Start ---------------------------

exports.bookingStatus = async (req, res) => {
  const { _id, Status } = req.body;
  try {
    const update = await Book.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Status: Status,
        },
      }
    );
    return res.json({ status: "ok", msg: "Please Reschedule Appointment" });
    // console.log(update);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

exports.appointmentDone = async (req, res) => {
  const { _id, Status } = req.body;
  try {
    const update = await Book.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Status: Status,
        },
      }
    );
    return res.json({ status: "ok", msg: "This Appointment Is Done" });
    // console.log(update);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

exports.addnote = async (req, res) => {
  const { _id, note } = req.body;
  const fileinfo = req.file;
  try {
    const update = await Book.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          Note: note,
          File: fileinfo.location,
        },
      }
    );
    return res.json({ status: "ok", msg: "This Appointment Note Is Done" });
    // console.log(update);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};

exports.bookingReschedule = async (req, res) => {
  const {
    P_email,
    D_email,
    P_name,
    D_name,
    Price,
    Slot,
    Currentdate,
    SelectDate,
    Day,
    Bundle,
    MeetLink,
    Status,
  } = req.body;
  try {
    const book = await Book.create({
      P_email: P_email,
      D_email: D_email,
      P_name: P_name,
      D_name: D_name,
      Price: Price,
      Slot: Slot,
      Currentdate: Currentdate,
      SelectDate: SelectDate,
      Day: Day,
      Bundle: Bundle,
      MeetLink: MeetLink,
      Status: Status,
    });
    await book.save();
    return res.json({ status: "ok", msg: "Booking Reschedule Successfully" });
  } catch {
    return res.json({
      status: "error",
      msg: "error",
    });
  }
};

// --------------------------- Reschedule Booking Data End ----------------------------
// ---------------------- Bokking Data By Id Start ---------------------------

exports.bookingDataById = async (req, res) => {
  const { _id } = req.body;
  try {
    const data = await Book.findOne({ _id: _id }).lean();
    return res.json(data);
  } catch (error) {
    return res.json({ status: "error", msg: "error" });
  }
};
// --------------------------- Booking Data By Id End ----------------------------
// -------------------------------- Shifts Section Start -----------------------------
exports.settimeperiod = async (req, res) => {
  const { email, sun, mon, tue, wed, thu, fri, sat, start, end } = req.body;
  try {
    const shift = await Shift.create({
      email: email,
      sun: sun,
      mon: mon,
      tue: tue,
      wed: wed,
      thu: thu,
      fri: fri,
      sat: sat,
      start: start,
      end: end,
    });
    await shift.save();
    return res.json({ status: "ok", msg: "Add Shift Successfully" });
  } catch {
    return res.json({
      status: "error",
      msg: "error",
    });
  }
};
// -------------------------------- Shifts Section End ----------------------------------
// ---------------------- Collect Shifts Data By Email Start ---------------------------

exports.shiftdata = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await Shift.find({ email }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// ---------------------- Collect Shifts Data By Email End -----------------------------
// --------------------------------- Update Shift Section Start -------------------------------
exports.updatetimeperiod = async (req, res) => {
  const { email, sun, mon, tue, wed, thu, fri, sat } = req.body;
  try {
    const updatedata = await Shift.findOneAndUpdate(
      { email: email },
      {
        $set: {
          sun: sun,
          mon: mon,
          tue: tue,
          wed: wed,
          thu: thu,
          fri: fri,
          sat: sat,
        },
      }
    );
    // return res.json(updatedata)
    return res.json({ status: "ok", msg: "Update Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// ---------------------------- Update Shift Selction End ------------------------------
// -------------------------------- Set Doctor Price Start ----------------------------------
exports.doctorprice = async (req, res) => {
  const {
    email,
    ta_value,
    g_value,
    z_value,
    s_value,
    v_value,
    v_price,
    v_bundle,
    v_discount,
    vr_value,
    vr_price,
    vr_bundle,
    vr_discount,
    txt_value,
    txt_price,
    txt_bundle,
    txt_discount,
  } = req.body;
  try {
    const price = await DoctorPrice.create({
      email: email,
      ta_value: ta_value,
      g_value: g_value,
      z_value: z_value,
      s_value: s_value,
      v_value: v_value,
      v_price: v_price,
      v_bundle: v_bundle,
      v_discount: v_discount,
      vr_value: vr_value,
      vr_price: vr_price,
      vr_bundle: vr_bundle,
      vr_discount: vr_discount,
      txt_value: txt_value,
      txt_price: txt_price,
      txt_bundle: txt_bundle,
      txt_discount: txt_discount,
    });
    await price.save();
    return res.json({ status: "ok", msg: "Add Price Successfully" });
  } catch {
    return res.json({
      status: "error",
      msg: "error",
    });
  }
};
// -------------------------------- Set Doctor Price End ------------------------------------
// ---------------------- Collect Doctor Price Data By Email Start ---------------------------

exports.pricedata = async (req, res) => {
  const { email } = req.body;
  try {
    const data = await DoctorPrice.find({ email }).lean();
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// ---------------------- Collect Doctor Price Data By Email End -----------------------------
// --------------------------------- Update Doctor Price Section Start -------------------------------
exports.doctorupdateprice = async (req, res) => {
  const {
    email,
    ta_value,
    g_value,
    z_value,
    s_value,
    v_value,
    v_price,
    v_bundle,
    v_discount,
    vr_value,
    vr_price,
    vr_bundle,
    vr_discount,
    txt_value,
    txt_price,
    txt_bundle,
    txt_discount,
  } = req.body;
  try {
    const updatedata = await DoctorPrice.findOneAndUpdate(
      { email: email },
      {
        $set: {
          ta_value: ta_value,
          g_value: g_value,
          z_value: z_value,
          s_value: s_value,
          v_value: v_value,
          v_price: v_price,
          v_bundle: v_bundle,
          v_discount: v_discount,
          vr_value: vr_value,
          vr_price: vr_price,
          vr_bundle: vr_bundle,
          vr_discount: vr_discount,
          txt_value: txt_value,
          txt_price: txt_price,
          txt_bundle: txt_bundle,
          txt_discount: txt_discount,
        },
      }
    );
    // return res.json(updatedata)
    return res.json({ status: "ok", msg: "Update Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", msg: "error" });
  }
};
// ---------------------------- Update Doctor Price Selction End ------------------------------
// ---------------------- Collect Doctors Data By Role Start ---------------------------

exports.doctorsdata = async (req, res) => {
  const { role } = req.body;
  try {
    const data = await User.find({ role: role }).lean();
    return res.json(data);
  } catch (error) {
    return res.json({ status: "error", msg: "error" });
  }
};
// ---------------------- Collect Doctors Data By Role End -----------------------------

//=================== Register ===========================================
exports.register = async (req, res) => {
  const { name, age, email, password, role } = req.body;

  // Hasing the passwords - we use bcrypt algorithm
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  emailToken = crypto.randomBytes(64).toString("hex");

  // Creating the user in the database
  try {
    const user = await User.create({
      name,
      username: nanoid(),
      age,
      password: hash,
      email,
      emailToken,
      role,
    });

    const rooms = await chatRoom.find({});

    rooms.forEach(async (room) => {
      room.userIds.addToSet(user._id);
      await user.rooms.addToSet(room._id);
      await room.save();
    });

    await user.save();

    // email to be sent to the user
    const msg = {
      from: `LeapifyTalk <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Verify your email to continue",
      text: `
               Please verify your email. 
                ${process.env.URI}/api/verify-email?token=${emailToken}
            `,
      html: `                    
                <a href="${process.env.URI}/api/verify-email?token=${emailToken}"> Verify email Address</a>

                ${process.env.URI}/api/verify-email?token=${emailToken}
                                            
            `,
    };

    const mail = sendmail(msg);
    // .then((rec) => res.json({ rec }))
    // .catch((e) => res.json({ e }));
    // return res.json({
    //   status: "ok",
    //   userId: user._id,
    // });
  } catch (error) {
    if (error.code === 11000 && error.errmsg.includes("email")) {
      return res.json({
        status: "error",
        msg: "email already exists",
      });
    }
    throw error;
  }
  return res.json({
    status: "ok",
    msg: "User registered Successfully, Check your email and verify it",
  });
};
//=================== Register ===========================================

//=================== Verify mail ===========================================
exports.verifyMail = async (req, res) => {
  const token = req.query.token;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { emailToken: token },
      { $set: { emailToken: null, isVerified: true } }
    );
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

//=================== Login ===========================================
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const user = await User.findOne({ email }).lean();
  if (!user) {
    return res.json({
      status: "error",
      msg: "User Not Found",
    });
  }
  // console.log(user);
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
        // dname : user.first_name+' '+user.last_name,
        role: user.role,
        // user: "therapist",
        dname: user.first_name + " " + user.last_name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    await User.findOneAndUpdate(
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

// ================Edit Profile=========================
exports.getDetails = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token, { complete: true });
  const userID = decoded.payload.id;
  const finduser = await User.findOne(
    { _id: userID },
    { name: 1, email: 1, photo: 1, phone: 1 }
  ).exec();
  res.json({ status: "ok", response: finduser });
};

exports.editProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.decode(token, { complete: true });
    const userID = decoded.payload.id;
    if (!req.file) {
      const updateUser = await User.findOneAndUpdate(
        { _id: userID },
        { $set: { email, name, phone } }
      ).exec();
      res.json({ status: "ok", msg: "Updated the Details" });
    } else {
      const photo = req.file.location;
      const updateUser = await User.findOneAndUpdate(
        { _id: userID },
        { $set: { email, name, phone, photo } }
      ).exec();
      res.json({ status: "ok", msg: "Updated the Details" });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "An Error occurred, please try again" });
  }
};

//=================== Logout ===========================================
exports.logout = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user.email);
    User.findOneAndUpdate(
      { email: user.email },
      { $set: { tokens: "" } },
      (err, result) => {
        if (err) console.log(err);
        // console.log(result);
      }
    );

    return res.json({ status: "ok", msg: "successfully logged out" });
  } catch (e) {
    console.log(e);
    return res.json({ status: "error" });
  }
};
//=================== Logout ===========================================
//=================== Forgot Password ===========================================
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      status: "error",
      msg: "No user with this email",
    });
  }
  let token = crypto.randomBytes(64).toString("hex");
  user.emailToken = token;
  await user.save();

  try {
    const msg = {
      from: `Banao <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Reset password link",
      text: `
            hello, your request for reactivation is confirmed
            please click on the link to reset your passwrod
            ${process.env.CLIENT_URI}/forgot-password/${token}
            `,
      html: `
            hello, your request for reactivation is confirmed
            please click on the link to reset your passwrod
            <a href="${process.env.CLIENT_URI}/reset-password/${token}"> reset password </a>
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
//=================== Forgot Password ===========================================

//=================== Forgot Password Verfiy ===========================================
exports.forgotPasswordVerify = async (req, res) => {
  const { token } = req.params;
  try {
    let user = await User.findOne({ emailToken: token });
    if (!user) {
      return res.json({
        status: "error",
        msg: "Token is invalid or expired",
      });
    }
    await User.findOneAndUpdate(
      { emailToken: token },
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
    const user = await User.findOne({ emailToken: token });
    if (!user) {
      return res.json({
        status: "error",
        msg: "Invalid token or token is expired",
      });
    }
    if (!user.verifiedForPasswordReset) {
      return res.json({
        status: "error",
        msg: "You have no permissions",
      });
    }
    if (token !== user.emailToken || user.emailToken === null) {
      return res.json({
        status: "error",
        msg: "token is not valid or expired",
      });
    }

    if (new_password !== confirm_password) {
      res.json({ status: "error", msg: "password does not match" });
    }
    const password = await bcrypt.hash(new_password, 10);
    await User.findOneAndUpdate(
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

// =================== Get all Rooms of a user ===============================
exports.getRooms = async (req, res) => {
  const { userId } = req.query;

  const user = await User.findOne({ _id: userId }).populate("rooms");

  if (!user) {
    return res.json({
      status: "error",
      msg: "no user found",
    });
  }

  return res.json({
    status: "ok",
    msg: "rooms received successfully",
    rooms: user.rooms,
  });
};

// =================== Get all Rooms of a user ===============================

// ===================== Enroll a course ======================

exports.enrollCourse = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.decode(token, { complete: true });
    const userID = decoded.payload.id;
    const { id } = req.params;
    // const { userID } = req.body;
    const course1 = await course
      .findByIdAndUpdate(id, { $push: { students: userID } })
      .exec();
    if (!course1) {
      res.json({ status: "error", msg: "Invalid Course" });
    } else {
      const studentCourse = await User.findByIdAndUpdate(userID, {
        $push: { courses: id },
      }).exec();
      res.json({ status: "ok", msg: { course1, studentCourse } });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

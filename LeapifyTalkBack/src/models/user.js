const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    mobile: { type: String },
    gender: { type: String },
    address: { type: String },
    image: { type: String },
    paypalId: { type: String },
    licenceimage: { type: String },
    qualification: { type: String },
    experience: { type: String },
    licenceNo: { type: String },
    aboutMe: { type: String },
    department: { type: String },
    expierenceDetails: {},
    specialitiesDetails: {},
    therapyDetails: {},
    // youtubelink: { type: String},
    googlemeetlink: { type: String },
    zoomlink: { type: String },
    skypelink: { type: String },
    facebooklink: { type: String },
    instagramlink: { type: String },
    twitterlink: { type: String },
    result: { type: Array },

    role: { type: String },

    quizID: { type: String },
    quizStatus: { type: String },

    headline: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    registerToken: {
      type: String,
      default: null,
    },
    verifiedUser: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        ref: "courses",
        type: Schema.Types.ObjectId,
      },
    ],
    about_instructor: {
      type: String,
    },
    salary: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
    certification: {
      type: String,
      default: "UGC",
    },
    lastAttempted: {
      type: Schema.Types.ObjectId,
      ref: "question",
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    otp: {
      type: String,
    },
    loginOtp: {
      type: String,
    },
    timeOtpSent: {
      type: Number,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    timeLoginOtpSent: {
      type: Number,
    },
    loggedIn: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    notApproved: {
      type: Boolean,
    },
    onHold: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      unique: true,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "ChatRoom",
      },
    ],
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
    therapist: [
      {
        type: Schema.Types.ObjectId,
        ref: "therapist",
      },
    ],
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    proceedToBuy: {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
    paymentToken: {
      type: String,
    },
    phone: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
    },
    name: {
      type: String,
    },
    emailToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedForPasswordReset: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: {
      type: String,
    },
    ongoing_courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "ongoing",
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const model = mongoose.model("User", UserSchema);

module.exports = model;

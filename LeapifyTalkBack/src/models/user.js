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
    role: { type: String },
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
    googlemeetlink: { type: String},
    zoomlink: { type: String},
    skypelink: { type: String},
    facebooklink: { type: String},
    instagramlink: { type: String},
    twitterlink: { type: String},

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
    // phone: {
    //   type: String,
    //   default: "",
    // },
    // photo: {
    //   type: String,
    //   default: "",
    // },
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
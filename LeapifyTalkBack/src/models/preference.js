const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const preferenceSchema = mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    preferenceID: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
    },
    0: [
      {
        type: String,
      },
    ],
    1: [
      {
        type: String,
      },
    ],
    2: [
      {
        type: String,
      },
    ],
    3: [
      {
        type: String,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const model = mongoose.model("preference", preferenceSchema);

module.exports = model;

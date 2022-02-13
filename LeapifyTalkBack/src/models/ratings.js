const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new mongoose.Schema(
  {
    courseID: {
      type: Schema.Types.ObjectId,
      ref: "courses",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rates: {
      type: Number,
    },
    review: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const rate = mongoose.model("rating", ratingSchema);
module.exports = rate;

var mongoose = require("mongoose");
var questionSchema = mongoose.Schema({
  quizID: {
    ref: "quiz",
    type: Schema.Types.ObjectId,
  },
  comprehension: {
    type: String,
  },
  question_no: {
    type: Number,
  },
  questionText: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("question", questionSchema);

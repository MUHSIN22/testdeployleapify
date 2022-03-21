var mongoose = require("mongoose");
var quizSchema = mongoose.Schema({
  questions: [
    {
      ref: "question",
      type: Schema.Types.ObjectId,
    },
  ],
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
});
module.exports = mongoose.model("quiz", quizSchema);

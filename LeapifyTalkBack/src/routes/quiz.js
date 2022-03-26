const express = require("express");
const router = new express.Router();
const {
  makeQuiz,
  makeQuestion,
  getQuiz,
  getQuestion,
  finishQuiz,
  checkAnswer,
} = require("../controllers/quiz");
const { auth } = require("../middlewares/auth");

router.post("/make-quiz", makeQuiz);
router.post("/make-question/:quizID", makeQuestion);
router.get("/get-question/:id", getQuestion);
router.get("/get-quiz/:id", getQuiz);
router.post("/finish-quiz", auth, finishQuiz);
router.post("/check-answer", auth, checkAnswer);

module.exports = router;

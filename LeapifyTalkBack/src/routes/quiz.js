const express = require("express");
const router = new express.Router();
const {
  makeQuiz,
  makeQuestion,
  getQuiz,
  getQuestion,
  finishQuiz,
  checkAnswer,
  postPreference,
  // makePreference,
} = require("../controllers/quiz");
const { auth } = require("../middlewares/auth");

router.post("/make-quiz", makeQuiz);
router.post('/preference',postPreference)
// router.post("/make-preference", makePreference);
router.post("/make-question/:quizID", makeQuestion);
router.get("/get-question/:id", getQuestion);
router.get("/get-quiz/:id", getQuiz);
router.get("/finish-quiz/:id", auth, finishQuiz);
router.post("/check-answer/:id", auth, checkAnswer);

module.exports = router;

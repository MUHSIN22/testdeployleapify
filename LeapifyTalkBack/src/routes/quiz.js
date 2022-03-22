const express = require("express");
const router = new express.Router();
const {
  makeQuiz,
  makeQuestion,
  getQuiz,
  getQuestion,
} = require("../controllers/quiz");

router.post("/make-quiz", makeQuiz);
router.post("/make-question/:quizID", makeQuestion);
router.get("/get-question/:id", getQuestion);
router.get("/get-quiz/:id", getQuiz);

module.exports = router;

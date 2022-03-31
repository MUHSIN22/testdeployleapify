const mongoose = require("mongoose");
const quiz = require("../models/quiz");
const question = require("../models/questions");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.makeQuiz = async (req, res) => {
  const { name } = req.body;

  try {
    const newQuiz = await quiz.create({
      name,
    });

    console.log(newQuiz);

    res.json({ status: "ok", msg: "Quiz created" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

exports.makeQuestion = async (req, res) => {
  const quizID = req.params.quizID;
  const { comprehension, question_no, questionText, answer, options } =
    req.body;

  try {
    const split_options = options.split(",");

    const newQuestion = await question.create({
      quizID,
      comprehension,
      question_no,
      questionText,
      answer,
      options: split_options,
    });

    const edit_quiz = await quiz.findByIdAndUpdate(quizID, {
      $push: { questions: newQuestion._id },
    });

    res.json({ status: "ok", msg: "Question Created" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const id = req.params.id;

    try {
      const sendQuiz = await quiz
        .findById(id)
        .populate(["questions", "lastAttempted"])
        .exec();
      if (!sendQuiz) {
        res.json({ status: "error", msg: "Wrong id" });
      } else {
        res.json({ status: "ok", sendQuiz });
      }
    } catch (e) {
      const sendQuiz = await quiz.findById(id).populate("questions").exec();
      if (!sendQuiz) {
        res.json({ status: "error", msg: "Wrong id" });
      } else {
        res.json({ status: "ok", sendQuiz });
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const sendQuestion = await question
      .findById(id, { answer: 0 })
      .populate("quizID")
      .exec();

    if (!sendQuestion) {
      res.json({ status: "error", msg: "Wrong id" });
    } else {
      res.json({ status: "ok", sendQuestion });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};
exports.finishQuiz = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const findToken = await user.findOne({ tokens: token }).exec();
  const decoded = jwt.decode(findToken.tokens, { complete: true });
  const userID = decoded.payload.id;

  try {
    const { id } = req.params;
    const forQuiz = await quiz.findById(id);
    const result = findToken.currentScore / forQuiz.questions.length;
    if (result >= 0.5) {
      const updateUser = await user
        .findByIdAndUpdate(userID, { quizStatus: "passed" })
        .exec();
      return res.json({
        status: "ok",
        msg: "Congratulations! Now you are a companion.",
      });
    } else {
      const updateUser = await user
        .findByIdAndUpdate(userID, {
          quizStatus: "failed",
          lastAttempted: null,
          currentScore: 0,
        })
        .exec();
      return res.json({
        status: "ok",
        msg: "Please attempt the test again, you have failed",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

exports.checkAnswer = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const findToken = await user.findOne({ tokens: token }).exec();
  const decoded = jwt.decode(findToken.tokens, { complete: true });
  const userID = decoded.payload.id;

  const { id } = req.params;
  const { answer } = req.body;

  try {
    // const updateAttempted = await user.findById(userID).exec();
    const findQuestion = await question.findById(id).exec();
    if (!findQuestion) {
      return res.json({ status: "error", msg: "wrong id" });
    } else if (findQuestion.answer == answer) {
      findToken.lastAttempted = id;
      findToken.currentScore += 1;
      await findToken.save();
      return res.json({
        status: "ok",
        msg: "correct answer",
        currentScore: findToken.currentScore,
      });
    } else if (answer == null) {
      findToken.lastAttempted = id;
      return res.json({
        status: "ok",
        msg: "timeout",
        currentScore: findToken.currentScore,
      });
    } else {
      findToken.lastAttempted = id;
      // updateAttempted.currentScore += 0;
      await findToken.save();
      return res.json({
        status: "ok",
        msg: "incorrect answer",
        currentScore: findToken.currentScore,
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

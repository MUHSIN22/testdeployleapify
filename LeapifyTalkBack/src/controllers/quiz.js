const mongoose = require("mongoose");
const quiz = require("../models/quiz");
const question = require("../models/questions");

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
  console.log(req.body);

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

    console.log(edit_quiz, newQuestion);

    res.json({ status: "ok", msg: "Question Created" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const id = req.params.id;

    const sendQuiz = await quiz.findById(id).populate("questions").exec();

    if (!sendQuiz) {
      res.json({ status: "error", msg: "Wrong id" });
    } else {
      res.json({ status: "ok", sendQuiz });
    }
  } catch (e) {
    console.log(e);
    res.json({ status: "error", msg: "an error occured" });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const sendQuestion = await question.findById(id).populate("quizID").exec();

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

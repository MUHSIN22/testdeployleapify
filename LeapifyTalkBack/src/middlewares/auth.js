const jwt = require("jsonwebtoken");
const User = require("../models/user");
const admin = require("../models/admin");
const therapist = require("../models/therapists");
const companion = require("../models/companion");
// auth for student
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await companion.findOne({ _id: decoded.id, tokens: token });
    if (!user) {
      res.status(401).send({ error: "Please authenticate." });
    } else {
      req.token = token;
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

// auth for therapist

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await therapist.findOne({ _id: decoded.id, tokens: token });
    if (!admin) {
      res.status(401).send({ error: "Please authenticate." });
    } else {
      req.token = token;
      req.admin = admin;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Some error occured" });
  }
};

const adminAuthLeapify = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin1 = await admin.findOne({ _id: decoded.id, tokens: token });
    if (!admin1) {
      res.status(401).send({ error: "Please authenticate." });
    } else {
      req.token = token;
      req.adminLeapify = admin1;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Some error occured" });
  }
};

const decodeTokenTherapist = (tokens) => {
  const findToken = therapist
    .findOne({
      tokens: tokens,
    })
    .exec();
  findToken.then((msg) => {
    return msg;
  });
  // if (!findToken) {
  //   return null;
  // } else {
  //   const decoded = jwt.decode(findToken, { complete: true });
  //   console.log(decoded);
};
module.exports = { auth, adminAuth, adminAuthLeapify, decodeTokenTherapist };

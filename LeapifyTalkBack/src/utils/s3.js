require("dotenv").config();
const multers3 = require("multer-s3");
const multer = require("multer");
const aws = require("aws-sdk");

const s3Config = new aws.S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_KEY_SECRET,
});

const multerS3 = new multers3({
  s3: s3Config,
  bucket: process.env.BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    console.log(file);
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: multerS3,
});

module.exports = upload;

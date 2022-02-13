require("dotenv").config();
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const paypal = require("paypal-rest-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Chat = require("./src/models/chats");
const moment = require("moment");
const { Users } = require("./src/utils/UserClass");

const fs = require("fs");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

// Connect to Database
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

require("./src/socket/message")(io, Users);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
const { auth, adminAuth } = require("./src/middlewares/auth");

// Routes
const authRoutes = require("./src/routes/auth");
const chatRoomRouter = require("./src/routes/chatRoom");
const chatRouter = require("./src/routes/chat");
const notificationRouter = require("./src/routes/notifications");
const courseRouter = require("./src/routes/courses");
const therapistRouter = require("./src/routes/therapists");
const adminRouter = require("./src/routes/admin");

app.use("/api", authRoutes);
app.use("/api/room", chatRoomRouter);
app.use("/api/chat", chatRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/courses", courseRouter);
app.use("/api/therapist", therapistRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.status(200).json({ api: "version 1" });
});

if (process.env.ENV === "production") {
  app.get("/", (req, res) => {
    res.json({ status: "ok" });
  });
}

const port = process.env.PORT;
server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server is up on port " + port);
});

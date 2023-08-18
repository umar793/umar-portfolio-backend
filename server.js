const express = require("express");
const app = express();
const cloudinary = require("cloudinary");

// ------------------- dotenv
require("dotenv").config();

// -------------- cors
var cors = require("cors");
app.use(cors());

// body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// --------------- connect db
require("./DB/DB");

// ======== cloudinary
cloudinary.config({
  cloud_name: "dvgvcifrd",
  api_key: "651412252829259",
  api_secret: "RC4IM6i6t_oginPt9h1os5C5BBw",
});

// --------------- router
app.use("/", require("./Router/userRouter"));
app.use("/", require("./Router/BlogRouter"));

// ---------------------- creating server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

// ============================== Error Handling
process.on("uncaughtException", (err) => {
  console.log(`Unhandled error due to uncaughtException: ${err.message}`);
  console.log("Server shutting down");
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled error due to unhandledRejection: ${err.message}`);
  console.log("Server shutting down");
  server.close(() => {
    process.exit(1);
  });
});

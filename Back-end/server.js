require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const app = express();

var bodyParser = require("body-parser");
const { db } = require("./db");
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("methods", "GET,POST");
  next();
});
app.use("/", userRoutes);
app.listen(3001);

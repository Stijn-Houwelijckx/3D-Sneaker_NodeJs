var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const config = require("config");
const cors = require("cors");

// Connecting to the database
const mongoose = require("mongoose");
const connection = config.get("mongodb");
console.log("connection: " + connection);

//mongoose.connect("mongodb://127.0.0.1:27017/MONGODBLES");
mongoose.connect(connection);

// Importing the routes
const userRouter = require("./routes/api/v1/users");
const orderRouter = require("./routes/api/v1/orders");
const passport = require("./passport/passport");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Using the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

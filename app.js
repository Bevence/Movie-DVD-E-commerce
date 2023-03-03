const config = require("config");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const { admin, adminRouter } = require("./admin");

const indexRouter = require("./modules/route");

const app = express();
const port = config.get("app.port");
// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/v1", indexRouter);

app.use(admin.options.rootPath, adminRouter);

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
  res.json({
    status: false,
    data: null,
    message: err.message ? err.message : err,
  });
});

app.listen(port, "localhost", (err) => {
  if (err) {
    console.log({ err });
  } else {
    console.log(`🚀 Server ready at: http://localhost:${port}`);
    console.log(
      `AdminJS started on http://localhost:${port}${admin.options.rootPath}`
    );
  }
});

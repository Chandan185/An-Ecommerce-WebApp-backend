const express = require("express");
const errorMiddleware = require("./middlewares/errors");
const CookieParser = require("cookie-parser");
// const cors = require("cors");
const app = express();
app.use(express.json());
app.use(CookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  next();
});

const product = require("./routes/products");
const user = require("./routes/users");
const order = require("./routes/orders");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use(errorMiddleware);
module.exports = app;

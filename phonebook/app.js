const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const phonebook = require("./controller/phonebook");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const url = config.DATABASE_URL;
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

// Morgan middleware
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

console.log(url);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("databse conected succesfuly");
  })
  .catch((error) => {
    console.log("error while conecting to database", error.message);
  });

const date = new Date();

app.use("/api/persons/", phonebook);
app.use(middleware.unknownEndpoint);
app.use(middleware.errHandler);

module.exports = app;

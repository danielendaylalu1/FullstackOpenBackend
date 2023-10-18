const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogs = require("./controller/blogs");
const config = require("./utils/config");

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? config.TEST_DATABASE_URL
    : config.DATABASE_URL;

// const mongoUrl = config.DATABASE_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, (res) => {
  console.log("connected to moongose");
});

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogs);

module.exports = app;

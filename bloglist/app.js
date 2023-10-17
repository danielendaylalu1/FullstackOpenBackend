const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogs = require("./controller/blogs");
const config = require("./utils/config");

const mongoUrl = config.DATABASE_URL;

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl).then((res) => {
  console.log("connected to moongose");
});

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogs);

module.exports = app;

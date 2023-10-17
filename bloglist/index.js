const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogs = require("./controller/blogs");
const config = require("./utils/config");

const mongoUrl = config.DATABASE_URL;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogs);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

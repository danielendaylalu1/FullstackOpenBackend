const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<p>hello there!</p>");
});

app.listen("3000", (req, res) => {
  console.log("server started on port 3000");
});

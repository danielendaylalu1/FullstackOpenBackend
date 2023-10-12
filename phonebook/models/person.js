const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DATABASE_URL;
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

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phone", personSchema);

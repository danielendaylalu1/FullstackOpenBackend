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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\\d{2,3}-\\d{6}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid string! It should have 2 or 3 numbers, followed by a hyphen, and then followed by exactly 6 numbers.`,
    },
    minLength: 8,
    required: true,
  },
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phone", personSchema);

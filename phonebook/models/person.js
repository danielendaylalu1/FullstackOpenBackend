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
        console.log(/^\d{2,3}-\d{5,}$/.test(v));
        return /^\d{2,3}-\d{5,}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid string! use 09 or 032-123456 format `,
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

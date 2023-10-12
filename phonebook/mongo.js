const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

console.log(process.argv[2]);
const password = process.argv[2];

const url = `mongodb+srv://phoebook:${password}@phonebook.zig9nng.mongodb.net/phoneApp?retryWrites=true&w=majority`;
console.log(url);
mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Phone", personSchema);

const name = process.argv[3];
const number = process.argv[4];
const person = new Person({
  name: name,
  number: number,
});
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
if (name && number) {
  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

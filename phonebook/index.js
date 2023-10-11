const express = require("express");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const app = express();
app.use(express.json());

const date = new Date();

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const person = persons.find((p) => p.id.toString() === id);
  if (!person) {
    return res.status(404).send("<p>person doesn't exist</p>");
  }
  res.json(person);
});
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});
app.listen("3000", (req, res) => {
  console.log("server started on port 3000");
});

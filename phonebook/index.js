const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));

// Morgan middleware
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

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
app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * (1000 - 0 + 1)) + 0;
  const body = req.body;
  console.log(id, body, body.name);
  if (!body.name && !body.number) {
    return res.status(400).json({
      error: "all fileds required",
    });
  }
  if (
    persons.find((p) => {
      console.log(p.name, body.name);
      return p.name === body.name;
    })
  ) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: id,
  };
  persons = persons.concat(person);
  res.status(200).json(person);
});
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.use(unknownEndpoint);

const port = process.env.PORT || 3000;

app.listen("3000", (req, res) => {
  console.log(`server started on port ${port}`);
});

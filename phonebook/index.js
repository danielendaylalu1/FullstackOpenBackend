const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

// Morgan middleware
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

const date = new Date();

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});
app.get("/api/persons/:name", (req, res) => {
  const name = req.params.name;
  console.log(name);
  Person.find({ name: { $eq: name } }).then((result) => {
    res.json(result);
  });
  // const person = persons.find((p) => p.id.toString() === id);
  // if (!person) {
  //   return res.status(404).send("<p>person doesn't exist</p>");
  // }
  // res.json(person);
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`server started on port ${PORT}`);
});

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const errHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({
      error: "malformated id",
    });
  }
  if (error.name === "ValidationError") {
    return res.status(404).send({
      error: error.message,
    });
  }
  next(error);
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

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
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  // console.log(id);
  Person.findById(id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error.name, "some happen");
      next(error);
    });
});
app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  console.log(body, body.name);
  if (!body.name === "" && !body.number === "") {
    return res.status(400).json({
      error: "all fileds required",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const id = req.params.id;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(id);
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.use(unknownEndpoint);

app.use(errHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`server started on port ${PORT}`);
});

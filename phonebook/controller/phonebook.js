const phonebook = require("express").Router();

const Person = require("../models/person");

phonebook.get("", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});
phonebook.get("/:id", (req, res, next) => {
  const id = req.params.id;

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
phonebook.post("", (req, res, next) => {
  const body = req.body;
  console.log(body, body.name);
  if (!body.name === "" && !body.number === "") {
    return res.status(400).json({
      error: "all fileds required",
    });
  }
  if (check.test(body.number)) {
    console.log("yes");
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

phonebook.put("/:id", (req, res, next) => {
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

phonebook.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(id);
      res.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = phonebook;

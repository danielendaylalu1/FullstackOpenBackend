const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

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

module.exports = {
  unknownEndpoint,
  errHandler,
};

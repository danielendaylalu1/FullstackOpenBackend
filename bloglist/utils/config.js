require("dotenv").config();

const PORT = process.env.PORT;

const DATABASE_URL = process.env.DATABASE_URL;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;

module.exports = {
  PORT,
  DATABASE_URL,
  TEST_DATABASE_URL,
};

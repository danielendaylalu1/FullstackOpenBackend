const User = require("../models/user");
const app = require("../app");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const password = await bcrypt.hash("pass", 10);
  const user = new User({ username: "root", name: "dana", password });
  await user.save();
});

test("http user post test", async () => {
  let usersBefore = await User.find({});
  usersBefore = usersBefore.map((user) => user.toJSON());
  const user = { username: "bra", name: "danu", password: "hello" };
  await api
    .post("/api/users/")
    .send(user)
    .expect(201)
    .expect(/application\/json/);

  let userAfter = await User.find({});
  userAfter = userAfter.map((user) => user.toJSON());

  const userNames = userAfter.map((user) => user.username);

  expect(userAfter).toHaveLength(usersBefore.length + 1);
  expect(userNames).toContain(user.username);
});

afterAll(async () => {
  await mongoose.connection.close();
});

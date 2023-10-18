const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const api = supertest(app);

const initialState = [
  {
    author: "daniel",
    likes: 5,
    title: "some trail",
    url: "https://trail.com",
  },
  {
    author: "abebe",
    likes: 2,
    title: "start the path",
    url: "https://path.com",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(initialState[0]);
  await newBlog.save();
  newBlog = new Blog(initialState[1]);
  await newBlog.save();
});

test("should retern json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("should load blogs of length 3", async () => {
  const resp = await api.get("/api/blogs");
  console.log(resp.body.length);
  expect(resp.body).toHaveLength(3);
}, 100000);

test.only("should author be daniel", async () => {
  const resp = await api.get("/api/blogs");
  console.log(resp.body[0].author);
  expect(resp.body[0].author).toBe("daniel");
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});

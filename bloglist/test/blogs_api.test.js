const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const { initialState } = require("../utils/blog_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialState) {
    const newBlog = new Blog(blog);
    await newBlog.save();
  }
}, 1000000);

test("check http get request", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  console.log(blogs.body);

  expect(blogs.body).toHaveLength(initialState.length);
}, 1000000);

test("verifies unique id property", async () => {
  const resp = await api.get("/api/blogs");
  for (let blog of resp.body) {
    console.log(blog.id);
    expect(blog.id).toBeDefined();
  }
}, 1000000);

test("check http post", async () => {
  const newBlog = {
    author: "beki",
    title: "the v8 engine",
    url: "https://v8.com",
    likes: 1,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const resp = await api.get("/api/blogs");
  const blogsTitle = resp.body.map((blog) => blog.title);

  expect(resp.body).toHaveLength(initialState.length + 1);
  expect(blogsTitle).toContain("the v8 engine");
}, 100000);

test("check http post for missing like property", async () => {
  const newBlog = {
    author: "beki",
    title: "the v8 engine",
    url: "https://v8.com",
  };

  const resp = await api.post("/api/blogs", newBlog);
  const blog = resp.body;

  expect(blog.likes).toBe(0);
}, 100000);

test("check http post for missing properties", async () => {
  const newBlog = {
    author: "beki",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
}, 100000);

test("check http put for updating blogs", async () => {
  const blogs = await Blog.find({});
  const toUpdateBlog = blogs[0];
  const id = toUpdateBlog.id;
  const newBlog = { ...toUpdateBlog, likes: 8 };

  await api.put(`/api/blogs/${id}`).send(newBlog).expect(200);

  const result = await api.put(`/api/blogs/${id}`, newBlog, {
    new: true,
    runValidators: true,
    content: "query",
  });
  console.log(result.body);

  expect(result.body.likes).toBe(8);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});

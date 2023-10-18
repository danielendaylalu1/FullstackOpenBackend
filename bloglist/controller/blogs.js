const Blog = require("../models/blog");
const blogs = require("express").Router();

blogs.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    response.status(404).json({
      error: "no data found",
    });
  }
});

blogs.post("/", async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = blogs;

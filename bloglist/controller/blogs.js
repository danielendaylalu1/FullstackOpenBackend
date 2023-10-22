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

blogs.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

blogs.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    console.log(error);
    response.status(400).json({
      error: error.message,
    });
    // next(error);
  }
});

blogs.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const newBlog = {
    likes: body.likes,
    title: body.title,
    author: body.author,
  };
  try {
    const result = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.status(200).json(result);
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

blogs.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

module.exports = blogs;

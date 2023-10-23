const Blog = require("../models/blog");
const blogs = require("express").Router();
const User = require("../models/user");
const { use } = require("./users");

blogs.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    console.log(error);
    response.status(400).json({
      error: error.message,
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

blogs.post("/", async (req, res, next) => {
  try {
    const { author, title, url, likes, userId } = req.body;

    const user = await User.findById(userId);

    const blog = new Blog({
      author: author,
      title: title,
      url: url,
      likes: likes,
      user: user.id,
    });
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
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

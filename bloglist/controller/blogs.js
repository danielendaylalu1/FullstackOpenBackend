const Blog = require("../models/blog");
const blogs = require("express").Router();

blogs.get("/", (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => {
      response.status(404).json({
        errro: "no data found",
      });
    });
});

blogs.post("/", (request, response) => {
  const blog = new Blog(request.body);
  console.log(blog);
  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = blogs;

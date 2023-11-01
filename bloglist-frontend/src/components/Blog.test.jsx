import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("render a blog", () => {
  const blog = {
    author: "daniel",
    title: "testing react",
    url: "test.com",
    likes: 4,
  };
  render(<Blog blog={blog} />);

  screen.debug();

  const content = screen.getByText("testing react");
  expect(content).toBeDefined();
});

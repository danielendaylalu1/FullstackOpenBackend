const { average } = require("../utils/for_testing");

test("averge of [2, 3, 4]", () => {
  const result = average([2, 3, 4]);
  expect(result).toBe(3);
});

test("averge of []", () => {
  const result = average([]);
  expect(result).toBe(0);
});

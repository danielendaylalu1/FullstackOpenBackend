const { reverse } = require("../utils/for_testing");

test("reverse a", () => {
  const result = reverse("a");
  expect(result).toBe("a");
});

test("reverse react", () => {
  const result = reverse("react");
  expect(result).toBe("tcaer");
});

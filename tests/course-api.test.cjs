const { test } = require("node:test");
const assert = require("node:assert/strict");

test("returns the list of courses", async function () {
  // Arrange
  const url = "http://localhost:1337/api/courses";

  // Act
  const response = await fetch(url);
  const body = await response.json();

  // Assert
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.equal(typeof body.meta.servedAt, "string");
});

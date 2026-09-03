const { test } = require("node:test");
const assert = require("node:assert/strict");

const {
  calculateTotalDuration,
} = require("../src/api/course/utils/course-stats.ts");

test("calculates the total duration of all lessons", function () {
  // Arrange: Preparamos los datos
  const lessons = [
    { durationMinutes: 15 },
    { durationMinutes: 30 },
    { durationMinutes: 45 },
  ];

  // Act: Ejecutamos la función
  const result = calculateTotalDuration(lessons);

  // Assert: Comprobamos el resultado
  assert.equal(result, 90);
});

test("returns zero when there are no lessons", function () {
  // Array vacío
  const lessons = [];
  // Ejecutar calculateTotalDuration
  const result = calculateTotalDuration(lessons);
  // Comprobar que devuelve 0
  assert.equal(result, 0);
});

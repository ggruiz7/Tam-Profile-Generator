const { test, expect } = require("@jest/globals");
const Employee = require("../lib/Employee");

test("Should create a new employee object.", () => {
  const employee = new Employee("gg");
});

test("check Id Constructor", () => {
  const test = 2;
  const employee = new Employee("gg", test);
  expect(employee.id).toBe(test);
});

test("check email Constructor", () => {
  const test = "gg@gmail.com";
  const employee = new Employee("gg", 2, test);
  expect(employee.email).toBe(test);
});

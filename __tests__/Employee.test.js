// const { test, expect } = require("@jest/globals");
const Employee = require("../lib/Employee");

test("Should create a new employee object.", () => {
  const employee = new Employee("Daniel");
});

test("check Id Constructor", () => {
  const test = 34;
  const employee = new Employee("Daniel", test);
  expect(employee.id).toBe(test);
});

test("check email Constructor", () => {
  const test = "daniel@gmail.com";
  const employee = new Employee("Daniel", 45, test);
  expect(employee.email).toBe(test);
});

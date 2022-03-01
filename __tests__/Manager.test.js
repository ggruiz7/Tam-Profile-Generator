const { test, expect } = require("@jest/globals");
const Manager = require("../lib/Manager");

test("Create object for manager", () => {
  const manager = new Manager("3");
});

test("Check getOfficeNum", () => {
  const test = "3";
  const employee = new Manager("gg", 3, "a@gmail.com", "3");
  expect(employee.getOfficeNum()).toBe(test);
});

test("check OficeNumber Constructor", () => {
  const test = "555 555 9999";
  const employee = new Manager("gg", 3, "b@gmail.com", test);
  expect(employee.officeNumber).toBe(test);
});

test("check Role Function", () => {
  const test = "Manager";
  const employee = new Manager("gg", 3, "c@gmail.com", "555 555 9999");
  expect(employee.getRole()).toBe(test);
});

const Engineer = require("../lib/Engineer");

test("Create object for intern", () => {
  const manager = new Engineer("ggruiz7");
});

test("Check getGitHub", () => {
  const test = "ggruiz7";
  const employee = new Engineer("gg", 4, "a@gmail.com", "ggruiz7");
  expect(employee.getGitHub()).toBe(test);
});

test("check Github Constructor", () => {
  const test = "ggruiz7";
  const employee = new Engineer("gg", 4, "b@gmail.com", test);
  expect(employee.github).toBe(test);
});

test("check Role Function", () => {
  const test = "Engineer";
  const engineer = new Engineer("gg", 4, "c@gmail.com", "ggruiz7");
  expect(engineer.getRole()).toBe(test);
});

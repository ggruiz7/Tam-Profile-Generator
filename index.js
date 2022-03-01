// dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const jest = require("jest");

// constructors
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const { buildFailureTestResult } = require("@jest/test-result");
const { findSourceMap } = require("module");

// paths
const dist = path.resolve(__dirname, "dist");
const outPath = path.join(dist, "index.html");

const render = require("./src/template");

const employeeArr = [];

// function to start/build app
function employeeQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the employee you want to add: ",
        name: "empName",
      },
      {
        type: "input",
        message: "Enter the employee's ID number: ",
        name: "idNumber",
        validate: function validateId(idNumber) {
          if (typeof idNumber == "string") {
            return true;
          } else return "Id must be a number.";
        },
      },
      {
        type: "input",
        message: "Please enter the employee email address: ",
        name: "emailAdd",
        validate: function validateEmail(emailAdd) {
          // method for email validation, must use (a@b.com) format
          return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
            emailAdd
          );
        },
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (answers) {
      if (answers.role === "Manager") {
        managerQuestions(answers);
      } else if (answers.role === "Engineer") {
        engineerQuestions(answers);
      } else internQuestions(answers);
    });

  // if manager is selected
  function managerQuestions(employeeAnswers) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the manager's office number?",
          name: "officeNumber",
        },
        {
          type: "confirm",
          message: "Do you want to add another employee?",
          name: "addEmployee",
        },
      ])
      .then(function (answers) {
        const newManager = new Manager(
          employeeAnswers.empName,
          employeeAnswers.idNumber,
          employeeAnswers.emailAdd,
          answers.officeNumber
        );
        employeeArr.push(newManager);

        if (answers.addEmployee) {
          employeeQuestions();
        } else {
          buildApp();
        }
      });
  }
  // if engineer is selected
  function engineerQuestions(employeeAnswers) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the engineer's GitHub username?",
          name: "githubUsername",
        },
        {
          type: "confirm",
          message: "Do you want to add another employee?",
          name: "addEmployee",
        },
      ])
      .then(function (answers) {
        const newEngineer = new Engineer(
          employeeAnswers.empName,
          employeeAnswers.idNumber,
          employeeAnswers.emailAdd,
          answers.githubUsername
        );

        employeeArr.push(newEngineer);
        if (answers.addEmployee) {
          employeeQuestions();
        } else {
          buildApp();
        }
      });
  }

  // if intern is selected
  function internQuestions(employeeAnswers) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the intern's school name?",
          name: "schoolName",
        },
        {
          type: "confirm",
          message: "Do you want to add another employee?",
          name: "addEmployee",
        },
      ])
      .then(function (answers) {
        const newIntern = new Intern(
          employeeAnswers.empName,
          employeeAnswers.idNumber,
          employeeAnswers.emailAdd,
          answers.schoolName
        );
        employeeArr.push(newIntern);
        if (answers.addEmployee) {
          employeeQuestions();
        } else {
          buildApp();
        }
      });
  }

  // creates html file and dist folder path if not created
  function buildApp() {
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
    console.log("Check 'dist' folder for output.");

    // push employeeArr to write html file
    fs.writeFileSync(outPath, render(employeeArr), "utf-8");
  }
}

employeeQuestions();

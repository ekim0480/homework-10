// dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// setting up array to push emloyee data into
const employeeArr = [];

// logic for the app... runs inquirer prompts depending on employee role.
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose a role for your employee:",
        name: "role",
        choices: ["Intern", "Engineer", "Manager"],
      },
    ])
    .then(function (data) {
      if (data.role === "Manager") {
        addManager();
      } else if (data.role === "Engineer") {
        addEngineer();
      } else if (data.role === "Intern") {
        addIntern();
      }
    });
}

// function to loop to beginning if user wishes to add another team member
// otherwise, ends loop and prints HTML
function loop() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "loop",
      },
    ])
    .then((res) => {
      if (res.loop) {
        init();
      } else {
        printHTML();
        return;
      }
    });
}

// function to take data pushed to employeeArr and print it into HTML
function printHTML() {
  const html = render(employeeArr);
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log("HTML successfully generated and saved to ./output.");
    return;
  });
}

// function to validate email inputs
// googled
function validateEmail(input) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  } else {
    return "Please enter a valid email address!";
  }
}

// manager's set of prompts, and pushes the data to employeeArr
function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter manager's name:",
        name: "managerName",
      },
      {
        type: "input",
        message: "Enter manager's ID:",
        name: "managerId",
      },
      {
        type: "input",
        message: "Enter manager's e-mail:",
        name: "managerEmail",
        validate: validateEmail
      },
      {
        type: "input",
        message: "Enter manager's office number:",
        name: "managerOffice",
      },
    ])
    .then((data) => {
      let manager = new Manager(
        data.managerName,
        data.managerId,
        data.managerEmail,
        data.managerOffice
      );
      employeeArr.push(manager);
      loop();
    });
}

// engineer's set of prompts, and pushes the data to employeeArr
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter engineer's name:",
        name: "engineerName",
      },
      {
        type: "input",
        message: "Enter engineer's ID:",
        name: "engineerId",
      },
      {
        type: "input",
        message: "Enter engineer's e-mail:",
        name: "engineerEmail",
        validate: validateEmail
      },
      {
        type: "input",
        message: "Enter engineer's GitHub username:",
        name: "engineerGitHub",
      },
    ])
    .then((data) => {
      let engineer = new Engineer(
        data.engineerName,
        data.engineerId,
        data.engineerEmail,
        data.engineerOffice
      );
      employeeArr.push(engineer);
      loop();
    });
}

// intern's set of prompts, and pushes the data to employeeArr
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter intern's name:",
        name: "internName",
      },
      {
        type: "input",
        message: "Enter intern's ID:",
        name: "internId",
      },
      {
        type: "input",
        message: "Enter intern's e-mail:",
        name: "internEmail",
        validate: validateEmail
      },
      {
        type: "input",
        message: "Enter intern's school:",
        name: "internSchool",
      },
    ])
    .then((data) => {
      let intern = new Intern(
        data.internName,
        data.internId,
        data.internEmail,
        data.internSchool
      );
      employeeArr.push(intern);
      loop();
    });
}

// start application
init();

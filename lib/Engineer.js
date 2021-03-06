// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// import Employee.js
const Employee = require("./Employee");

// adding extensions to the Employee constructor
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github
        this.role = "Engineer"
    }

    getGithub() {
        return this.github
    }

    getRole() {
        return this.role
    }
}

module.exports = Engineer;
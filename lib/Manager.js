// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// import Employee.js
const Employee = require("./Employee")

// adding extensions the the Employee constructor
class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super(name, id, email)
        this.officeNum = officeNum
        this.role = "Manager"
    }

    getOfficeNum() {
        return this.officeNum
    }

    getRole() {
        return this.role
    }
}

module.exports = Manager;
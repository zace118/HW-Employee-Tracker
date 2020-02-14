const inquirer = require('inquirer');

// Using inquirer, be able to ADD departments, roles, employees, VIEW depts, roles, and emps, and UPDATE existing employee roles.
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View all employees",
                "Update employee role",
                "Update employee manager"
            ]
        }

    ]).then(function (res) {
        console.log(res.action)
    })
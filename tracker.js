const inquirer = require('inquirer');
const mysql = require('mysql');
// Requiring the connection (config)
const connection = require('./Public/connection')
// Variables set to function paths
const createFunctions = require('./Public/createFunctions');
const viewFunctions = require('./Public/viewFunctions');
const updateFunctions = require('./Public/updateFunctions');


function initialInquirer() {
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
            const answer = res.action;
            console.log(answer);
            switch (answer) {
                case 'Add department':
                    createFunctions.createDept();
                    break;

                case 'Add role':
                    createFunctions.createRole();
                    break;

                case 'Add employee':
                    createFunctions.createEmp();
                    break;

                case 'View departments':
                    viewFunctions.viewDepts();
                    break;

                case 'View roles':
                    viewFunctions.viewRoles();
                    break;

                case 'View all employees':
                    viewFunctions.viewEmps();
                    break;

                case 'Update employee role':
                    updateFunctions.updateRole();
                    break;

                case 'Update employee manager':
                    updateFunctions.updateManager();
                    break;
            }
        })
}

initialInquirer();

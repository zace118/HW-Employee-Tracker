const inquirer = require('inquirer');
const mysql = require('mysql');
// Variables set to function paths
const createFunctions = require('./Public/createFunctions');
const updateFunctions = require('./Public/updateFunctions');
const viewFunctions = require('./Public/viewFunctions');

// Creating the connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'tracker_db'
});

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
                    createDept();
                    break;

                case 'Add role':
                    createRole();
                    break;

                case 'Add employee':
                    createEmp();
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
                    updateRole();
                    break;

                case 'Update employee manager':
                    updateManager();
                    break;
            }
        })
}

initialInquirer();

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}.`);
})







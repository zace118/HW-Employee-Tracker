const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'tracker_db'
});

// Using inquirer, be able to ADD departments, roles, employees, VIEW depts, roles, and emps, and UPDATE existing employee roles.
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                // inq. (input) "What is the title of the department?" then add the role to array of departments. 
                "Add department",
                // inq. (input) "What is the title of the role?" then add the role to array of roles. 
                "Add role",
                // inq. (input) "What is the title of the employee?" then add the role to array of employees. 
                "Add employee",
                //inq. shows choices for depts
                "View departments",
                // inq. shows choices for roles
                "View roles",
                // inq. shows choices for employees
                "View all employees",
                // inq. shows choices for employess
                "Update employee role",
                // inq. shows choices for employess
                "Update employee manager"
            ]
        }

    ]).then(function (res) {
        console.log(res.action);
        const answer = res.action;
        if (answer === 'Add department') {
            createDept();
        }
        else if (answer === 'Add role') {
            createRole();
        }
        else if (answer === 'Add employee') {
            createEmp();
        }
        else if (answer === 'View departments') {
            viewDepts();
        }
        else if (answer === 'View roles') {
            viewRoles();
        }
        else if (answer === 'View all employees') {
            viewEmps();
        }
        else if (answer === 'Update employee role') {
            updateRole();
        }
        else if (answer === 'Update employee maager') {
            updateManager();
        }
    })

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}.`);
    afterConnection();
})

function afterConnection() {
    connection.query
}






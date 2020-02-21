const inquirer = require('inquirer');
const mysql = require('mysql');
// Requiring the connection (config)
const connection = require('./Public/connection')
// // Variables set to function paths
// const createFunctions = require('./Public/createFunctions');
// const viewFunctions = require('./Public/viewFunctions');
// const updateFunctions = require('./Public/updateFunctions');


function tracker() {
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
            // async
        ]).then(function (res) {
            const answer = res.action;
            // console.log(answer);
            switch (answer) {
                case 'Add department':
                    // wait
                    // if (createFunctions.createDept()) {
                    //     tracker();
                    //     console.log(createFunctions.createDept())
                    // }
                    createDept();
                    // tracker();
                    break;

                case 'Add role':
                    createRole();
                    break;

                case 'Add employee':
                    createEmp();
                    break;

                case 'View departments':
                    if (viewDepts()) {
                        tracker();
                    }
                    // viewDepts();
                    break;

                case 'View roles':
                    if (viewRoles()) {
                        tracker();
                    }
                    // viewRoles();
                    break;

                case 'View all employees':
                    if (viewEmps()) {
                        tracker();
                    }
                    // viewEmps();
                    break;

                case 'Update employee role':
                    if (updateRole()) {
                        tracker();
                    }
                    // updateRole();
                    break;

                case 'Update employee manager':
                    if (updateManager()) {
                        tracker();
                    }
                    // updateManager();
                    break;
            }
        })
};

tracker();


// ----------------GLOBAL VARIABLES---------------------------------------
let deptListNames;
let deptListIDs;
let empList;



// --------------VIEW FUNCTIONS-------------------------------------------


function viewDepts() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptListNames = res[i].deptName;
            deptListIDs = res[i].deptID;
            console.log(res[i].deptName);
        }
        return true
    })
    // tracker();

};

function viewRoles() {
    connection.query('SELECT * FROM empRole', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].title);
        }
        return true
    })
    // tracker();
};

function viewEmps() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            empList = (`${res[i].firstName} ${res[i].lastName}`);
        }
        return true
    })
    // tracker();
};
// --------------END OF VIEW FUNCTIONS-------------------------------------


// --------------CREATE FUNCTIONS------------------------------------------

// It's working, just unable to get it to start the tracker function again.
function createDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                name: 'newDeptName'
            }
        ]).then(function (response) {
            console.log(response.newDeptName);
            console.log('Inserting a new department...\n')
            connection.query(
                `INSERT INTO department (deptName) VALUES ('${response.newDeptName}')`,
                function (err, res) {
                    if (err) throw err;
                    console.log(`New department "${response.newDeptName}" added successfully!`);
                    // tracker();
                    // console.log(tracker());
                }
            )
            console.log("true");
            return true;
            // connection.end();
            // tracker.tracker();

        })

};

// This is breaking after getting past the first question. res.deptID isn't a thing???
function createRole() {

    console.log('Here is the department names' + deptListNames);

    // -----------------------------------------------------------------

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role you want to add?',
                name: 'newRoleTitle'
            },
            {
                type: 'list',
                message: 'What department will this role fall into?',
                name: 'newRoleDept',
                choices: [
                    'Thing1', 'Thing2', 'Thing3'
                ]
            },
            {
                type: 'number',
                message: 'What is the salary for this role?',
                name: 'newRoleSalary'
            }
        ]).then(function (res) {
            console.log(res);
            // Now, using magic and mysql, create a new department?
            // ----------------------------------------------------
            // INSERT INTO empRole(title, salary, departmentID)
            // VALUES (`${res.newDeptName}, ${res.newRoleSalary}, ${res.newRoleDept}`)
            // console.log('New role added successfully!');
        })
    tracker();
};

// This is breaking after getting past the first question. Needs acces to managerList, but IDK how to write conditional logic for this to happen.
function createEmp() {

    // I shouldn't need this connection.query now it's on this page....................

    // connection.query('SELECT * FROM department', function (err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         deptListNames = (res[i].deptName);
    //         deptListIDs = (res[i].deptID)
    //     }
    // })

    // Need the connection.query to access the manager information....so pull from employee table if title === "lead" add key:value pair of manager name. 

    inquirer
        .prompt([
            {
                type: 'input',
                message: `What is the employee's first name?`,
                name: 'newEmpFirstName'
            }, {
                type: 'input',
                message: `What is the employee's last name?`,
                name: 'newEmpLastName'
            }, {
                type: 'list',
                message: `What is the employee's department?`,
                name: 'newEmpDept',
                choices: [
                    deptListNames
                ]
            }, {
                type: 'list',
                message: `Who is the new employee's manager?`,
                name: 'newEmpManager',
                choices: [
                    // has no value right now; need to connect to that SQL table for this info. 
                    managerListNames
                ]
            }
        ]).then(function (res) {
            console.log(res);
            // Gonna need some kinda key:value pairing to select "if (deptListNames ==='certain dept') {return certain dept value};"

        })

    tracker();
};
// ---------------END OF CREATE FUNCTIONS--------------------------------

// ---------------UPDATE FUNCTIONS---------------------------------------


function updateRole() {
    // Starts prompt of who to update ---> what's their new role --->FIN
    inquirer
        .prompt([
            {
                type: 'list',
                message: `What employee's role did you want to update?`,
                name: 'empName',
                choices: [
                    empList
                ]
            },
            {
                type: 'list',
                message: `What's the employee's new role?`,
                name: 'newRole',
                choices: [
                    deptListNames
                ]
            }.then(function (response) {
                console.log(response);
            })
        ])

    connection.query("UPDATE employee SET ? WHERE ?",
        [
            {
                roleID: 4
                // match ID to the correct job title?
            },
            {
                employee: 4
                // firstName + lastName === empName
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            tracker();
        }
    );
}

function updateManager() {
    console.log("'ello guvna!");
    tracker();
};

// ---------------END OF UPDATE FUNCTIONS--------------------------------------------------------

const inquirer = require('inquirer');
// Requiring the tracker.js
const tracker = require('../tracker')
// Requiring the connection (config)
const connection = require('./connection')


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
            console.log('farts')
            console.log('Inserting a new department...\n')
            connection.query(
                `INSERT INTO department (deptName) VALUES ('${response.newDeptName}')`,
                function (err, res) {
                    if (err) throw err;
                    console.log(`New department "${response.newDeptName}" added successfully!`);
                }
            )


            // It's working, just unable to get it to start the tracker function again.
            connection.end();
            // tracker.tracker();
            // return true;

        })

};



function createRole() {
    let deptListNames;
    let deptListIDs;

    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptListNames = (res[i].deptName);
            deptListIDs = (res[i].deptID)
        }
    })

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
                    deptListNames
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

    // initialInquirer();
};


function createEmp() {
    let deptListNames;


    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptListNames = (res[i].deptName);
            deptListIDs = (res[i].deptID)
        }
    })

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

    // tarcker();
};

module.exports = {
    createDept,
    createRole,
    createEmp
};
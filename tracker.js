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
        ]).then(function (res) {
            const answer = res.action;
            // console.log(answer);
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
                    viewDepts();
                    break;

                case 'View roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmps();
                    break;

                case 'Update employee role':
                    updateRole();
                    break;

                case 'Update employee manager':
                    updateManager();
                    break;
            }
        })
};

tracker();

// --------------VIEW FUNCTIONS-------------------------------------------


function viewDepts() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptNamesList = res[i].deptName;
            deptIDsList = res[i].deptID;
            console.log(res[i].deptName);
        }
        tracker();
        // return true
    })

};

function viewRoles() {
    connection.query('SELECT * FROM empRole', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].title);
        }
        tracker();
        // return true
    })
};

function viewEmps() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            empNamesList = (`${res[i].firstName} ${res[i].lastName}`);
            empIDsList = (res[i].id);
            console.log(empNamesList);
            console.log(empIDsList)
        }
        tracker();
        // connection.end();
        // return true
    })
};
// --------------END OF VIEW FUNCTIONS-------------------------------------


// --------------CREATE FUNCTIONS------------------------------------------

// It's working, just need to get the tracker to wait until line 135 fires. 
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
                    tracker();
                }
            )
            // console.log("truuuue");
            return true;
        })

};

function createRole() {
    let roleList;

    connection.query('SELECT * FROM empRole', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            // console.log(`\n${res[i].title}`);
            roleList = res[i].title;
        }
    })

    console.log(roleList);

    // -----------------------------------------------------------------

    // inquirer
    //     .prompt([
    //         {
    //             type: 'input',
    //             message: 'What is the name of the role you want to add?',
    //             name: 'newRoleTitle'
    //         },
    //         {
    //             type: 'list',
    //             message: 'What department will this role fall into?',
    //             name: 'newRoleDept',
    //             choices: [
    //                 'Thing1', 'Thing2', 'Thing3'
    //             ]
    //         },
    //         {
    //             type: 'number',
    //             message: 'What is the salary for this role?',
    //             name: 'newRoleSalary'
    //         }
    //     ]).then(function (res) {
    //         console.log(res);
    //         // Now, using magic and mysql, create a new department?
    //         // ----------------------------------------------------
    //         // INSERT INTO empRole(title, salary, departmentID)
    //         // VALUES (`${res.newDeptName}, ${res.newRoleSalary}, ${res.newRoleDept}`)
    //         // console.log('New role added successfully!');
    //     })
    // tracker();
    connection.end();
};

function createEmp() {
    // Selecting from the table who the managers are.
    connection.query('SELECT * FROM employee WHERE employee.roleID IN (1,3,7)', function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is the employee's first name?`,
                    name: 'newEmpFirstName'
                },
                {
                    type: 'input',
                    message: `What is the employee's last name?`,
                    name: 'newEmpLastName'
                },
                {
                    type: 'list',
                    message: `What is the employee's title?`,
                    name: 'newEmpTitle',
                    choices: [
                        'Sales Lead',
                        'Sales Associate',
                        'Lead Engineer',
                        'Software Engineer',
                        'Accountant',
                        'Legal Team Lead',
                        'Lawyer'
                    ]
                },
                {
                    type: 'list',
                    message: `Who is the new employee's manager?`,
                    name: 'newEmpMgr',
                    choices: function () {
                        let mgrArray = []
                        // console.log(res);

                        for (let i = 0; i < res.length; i++) {
                            mgrArray.push(`${res[i].firstName} ${res[i].lastName}`);
                        }
                        return (mgrArray);
                    }
                }
            ]).then(function (response) {
                // Sets the value of the last question in the Inquirer to a variable
                const res_NewEmpMgr = response.newEmpMgr

                // Slices the above variable at the first white space, indicating the first name, and sets that value (the new employee's MGR's first name) to a new variable
                const newEmpMgrFN = res_NewEmpMgr.substr(0, res_NewEmpMgr.indexOf(' '))
                // console.log(newEmpMgrFN);

                // Trying to reverse search for the new employee's MGR's ID# using the above variable 
                connection.query('SELECT roleID FROM employee WHERE employee.firstName = ?', [newEmpMgrFN], function (err, answer) {
                    // console.log(answer);
                    const newEmpMgrID = answer[0].roleID;
                    console.log(newEmpMgrID)
                    connection.end();

                    // Switch case to send the data from the inquirer to MySQL
                    switch (response.newEmpTitle) {
                        case ('Sales Lead'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                roleID: 1,
                                managerID: newEmpMgrID
                            })
                            // tracker();
                            break;
                        case ('Sales Associate'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                role_id: 2,
                                managerID: newEmpMgrID
                            })

                            break;
                        case ('Lead Engineer'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                role_id: 3,
                                managerID: newEmpMgrID
                            })

                            break;
                        case ('Software Engineer'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                role_id: 4,
                                managerID: newEmpMgrID
                            })
                            break;
                        case ('Accountant'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                role_id: 5,
                                managerID: newEmpMgrID
                            })
                            break;
                        case ('Legal Team Lead'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                role_id: 6,
                                managerID: newEmpMgrID
                            })
                            break;
                        case ('Lawyer'):
                            connection.query(
                                'INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                role_id: 7,
                                managerID: newEmpMgrID
                            })

                        // tracker();

                    }

                });

            })
    });
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

// ---------------END OF UPDATE FUNCTIONS----------------------------------

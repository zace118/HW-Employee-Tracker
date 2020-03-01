const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
// Requiring the connection (config)
const connection = require('./Public/connection')

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
                    "Delete employee"
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

                case 'Delete employee':
                    deleteEmp();
                    break;
            }
        })
};

tracker();

// --------------VIEW FUNCTIONS-------------------------------------------
function viewDepts() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        // for (let i = 0; i < res.length; i++) {
        //     deptNamesList = res[i].deptName;
        //     deptIDsList = res[i].deptID;
        // }
        tracker();
    })

};

function viewRoles() {
    connection.query('SELECT * FROM empRole', function (err, res) {
        if (err) throw err;
        console.table(res)
        // for (let i = 0; i < res.length; i++) {
        //     console.log(res[i].title);
        // }
        tracker();
    })
};

function viewEmps() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        console.table(res);
        // for (let i = 0; i < res.length; i++) {
        //     empNamesList = (`${res[i].firstName} ${res[i].lastName}`);
        //     // empIDsList = (res[i].id);
        //     console.log(empNamesList);
        //     // console.log(empIDsList);
        // }
        tracker();
    })
};
// --------------END OF VIEW FUNCTIONS-------------------------------------



// --------------CREATE FUNCTIONS------------------------------------------ 
function createDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you want to add?',
                name: 'newDeptName'
            }
        ]).then(function (response) {
            // console.log(response.newDeptName);
            console.log('Inserting a new department...\n')
            connection.query(
                `INSERT INTO department (deptName) VALUES ('${response.newDeptName}')`,
                function (err, res) {
                    if (err) throw err;
                    console.log(`----------\nNew department "${response.newDeptName}" added successfully!\n----------`);
                    tracker();
                }
            )
        })

};

function createRole() {
    connection.query('SELECT * FROM department', function (err, response) {
        if (err) throw err;
        // console.log(response)
        let deptArray = response.map((element, index, array) => {
            return `${element.deptName}`
        })

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role you want to add?',
                    name: 'newRoleTitle'
                },
                {
                    type: 'number',
                    message: 'What is the salary for this role?',
                    name: 'newRoleSalary'
                },
                {
                    type: 'list',
                    message: 'What department will this role fall into?',
                    name: 'newRoleDept',
                    choices: deptArray
                },
            ]).then(function (res) {
                // Need the dept ID from the info we get from res.newRoleDept
                connection.query(`SELECT id FROM department WHERE deptName = '${[res.newRoleDept]}';`, function (err, response) {
                    if (err) throw err;
                    const newRoleDeptID = response[0].id;
                    // console.log(newRoleDeptID);


                    // Adding the values from the inquirer into the table 
                    connection.query(
                        `INSERT INTO empRole (title, salary, departmentID) VALUES ('${res.newRoleTitle}', ${res.newRoleSalary}, ${newRoleDeptID})`,
                        function (err, answer) {
                            if (err) throw err;
                            console.log(`----------\nNew department "${res.newRoleTitle}" added successfully!\n----------`);
                            tracker();
                        }
                    )
                })
            })
    })
};

function createEmp() {
    // Selecting from the table who the managers are.
    connection.query('SELECT * FROM employee WHERE employee.managerID IS NULL', function (err, res) {
        if (err) throw err;
        // console.log(res);
        let mgrArray = res.map((element, index, array) => {
            return `${element.firstName} ${element.lastName}`
        })

        // This query allows us to pull the list of roles for the chocies array in the inquirer 
        connection.query('SELECT * FROM empRole', function (err, response) {
            if (err) throw err;
            // console.log(response)
            let empRoleArray = response.map((el, i, arr) => {
                return `${el.title}`
            })

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
                        choices: empRoleArray
                    },
                    {
                        type: 'list',
                        message: `Who is the new employee's manager?`,
                        name: 'newEmpMgr',
                        choices: mgrArray
                    }
                ]).then(function (response) {
                    const mgrFullNameArr = response.newEmpMgr.split(' ');
                    const mgrFN = mgrFullNameArr[0];
                    const mgrLN = mgrFullNameArr[1];

                    // Pulling the new employee's manager's ID from the given names above
                    connection.query('SELECT roleID FROM employee WHERE employee.firstName = ? AND employee.lastName = ?', [mgrFN, mgrLN], function (err, answer) {
                        if (err) throw err;
                        const newEmpMgrID = answer[0].roleID;
                        console.log(newEmpMgrID);

                        // Pulling the ID of the new role the employee is getting updated into. 
                        connection.query('SELECT id FROM empRole WHERE empRole.title = ?', [response.newEmpTitle], function (err, res) {
                            // console.log(res[0].id);
                            const newEmpRoleID = res[0].id

                            connection.query('INSERT INTO employee SET ?', {
                                firstName: response.newEmpFirstName,
                                lastName: response.newEmpLastName,
                                roleID: newEmpRoleID,
                                managerID: newEmpMgrID
                            })
                            console.log(`----------\nNew employee, ${response.newEmpFirstName} ${response.newEmpLastName} added!\n----------`);
                            tracker();
                        });
                    });
                })
        });
    });
};
// ---------------END OF CREATE FUNCTIONS--------------------------------


// ---------------UPDATE FUNCTIONS---------------------------------------
function updateRole() {
    // This query allows us to pull the list of employee names for the chocies array in the inquirer
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // console.log(res);

        // This loops through res exactly like a for loop and returns the first and last name of the employees.
        let empArray = res.map((element, index, array) => {
            return `${element.firstName} ${element.lastName}`
        });

        // This query allows us to pull the list of roles for the chocies array in the inquirer 
        connection.query('SELECT * FROM empRole', function (err, response) {
            if (err) throw err;
            // console.log(response)
            let empRoleArray = response.map((element, i, arr) => {
                return `${element.title}`
            })

            // console.log(empArray);
            inquirer
                .prompt([
                    {
                        type: 'list',
                        message: `What employee's role did you want to update?`,
                        name: 'empName',
                        choices: empArray
                    },
                    {
                        type: 'list',
                        message: `What employee's new role?`,
                        name: 'empRole',
                        choices: empRoleArray
                    }
                ]).then(function (answer) {
                    // Getting the name of the employee broken down
                    const fullNameArr = answer.empName.split(' ');
                    const empFN = fullNameArr[0];
                    const empLN = fullNameArr[1];

                    // Pulling the ID of the new role the employee is getting updated into. 
                    connection.query('SELECT id FROM empRole WHERE empRole.title = ?', [answer.empRole], function (err, res) {
                        const newRoleID = res[0].id;

                        // This is the query that actually updates the database
                        connection.query("UPDATE employee SET ? WHERE ? AND ?",
                            [
                                {
                                    roleID: newRoleID
                                },
                                {
                                    firstName: empFN
                                },
                                {
                                    lastName: empLN
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log(`----------\n${answer.empName}'s role has been updated!\n----------`);

                                tracker();
                            }
                        );
                    });


                });
        })

    })
}

function deleteEmp() {
    // This query allows us to pull the list of employee names for the chocies array in the inquirer
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // console.log(res);

        // This loops through res exactly like a for loop and returns the first and last name of the employees.
        let empArray = res.map((element, index, array) => {
            return `${element.firstName} ${element.lastName}`
        });

        inquirer
            .prompt([
                {
                    type: 'list',
                    message: `What employee's profile do you want to delete?`,
                    name: 'empName',
                    choices: empArray
                }
            ]).then(function (res) {
                // Getting the name of the employee broken down
                const fullNameArr = res.empName.split(' ');
                const empFN = fullNameArr[0];
                const empLN = fullNameArr[1];

                // Pulling the ID from the given names above
                connection.query('SELECT id FROM employee WHERE employee.firstName = ? AND employee.lastName = ?', [empFN, empLN], function (err, res) {
                    // console.log(res[0].id);
                    const empID = res[0].id;

                    connection.query("DELETE FROM employee WHERE ?",
                        {
                            id: empID
                        },
                        function (err, response) {
                            if (err) throw err;
                            console.log(`----------\n${empFN} ${empLN} has been deleted!\n----------`);
                            tracker();
                        }
                    );
                })
            })

    });
};

// ------------END OF UPDATE FUNCTIONS---------------------------

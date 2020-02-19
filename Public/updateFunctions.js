// Requiring the connection (config)
const connection = require('./connection');

function updateRole() {
    // Pulls the employee list
    let empList;
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            empList = (`${res[i].firstName} ${res[i].lastName}`);
        }
    })
    connection.end();
    // How to pull the department list
    let deptList;
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptList = (res[i].deptName);
        }
    })
    connection.end();


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
                    deptList
                ]
            }.then(function (response) {
                console.log(response);
            })
        ])



    console.log("Updating all Rocky Road quantities...\n");
    const query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: 100
            },
            {
                flavor: "Rocky Road"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );
}

    // function updateManager() {
    //     console.log("'ello guvna!");
    // };

    // modeule.exports = {
    //     updateRole,
    //     updateManager
    // }
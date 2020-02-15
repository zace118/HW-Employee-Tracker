// Requiring the connection (config)
const connection = require('./connection');

function viewDepts() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].deptName);
        }
    })
    connection.end();
};

function viewRoles() {
    connection.query('SELECT * FROM empRole', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].title);
        }
    })
    connection.end();
};

function viewEmps() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (let i = 0; i < res.length; i++) {
            console.log(`${res[i].firstName} ${res[i].lastName}`);
        }
    })
    connection.end();
};

module.exports = {
    viewDepts,
    viewRoles,
    viewEmps
};
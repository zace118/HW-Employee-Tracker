// Requiring the connection (config)
const connection = require('./connection');

function viewDepts() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.log(res);
    })
};

function viewRoles() {
    console.log("'ello guvna!");
};

function viewEmps() {
    console.log("'ello guvna!");
};

module.exports = {
    viewDepts,
    viewRoles,
    viewEmps
};
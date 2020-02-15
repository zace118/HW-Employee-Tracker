const mysql = require('mysql');

function viewDepts() {
    connection.query('SELECT * FROM tracker_db', function (err, res) {
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
    viewDepts: viewDepts,
    viewRoles: viewRoles,
    viewEmps: viewEmps
};
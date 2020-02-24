DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

-- ------------------------------------------------ 
-- THIS IS GOOD TO GO!!!
DROP TABLE department;

CREATE TABLE department (
    id INT NOT NULL auto_increment,
    deptName VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (deptName)
VALUES ('Sales'), ('Finance'), ('Legal'), ('Engineering'), ('Kitchen');

SELECT * FROM department;

-- ------------------------------------------------ 
-- THIS IS GOOD TO GO!
DROP TABLE empRole;

CREATE TABLE empRole (
    id INT auto_increment,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    departmentID INT,
    PRIMARY KEY (id),
    FOREIGN KEY (departmentID) REFERENCES department(id)
);

INSERT INTO empRole (title, salary, departmentID)
VALUES ('Sales Lead', 100000.00, 1), ('Sales Associate', 80000.00, 1), ('Lead Engineer', 150000.00, 4), ('Software Engineer', 120000.00, 4), ('Accountant', 125000, 2), ('Legal Team Lead', 250000, 3), ('Lawyer',190000,3);

SELECT * FROM empRole;

-- ------------------------------------------------ 

DROP TABLE employee;

CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    roleID INT,
    managerID INT,
    PRIMARY KEY (id),
    FOREIGN KEY (roleID) REFERENCES empRole(id),
    FOREIGN KEY (managerID) REFERENCES employee(id)
);

-- Steve: 4, Lisa: 6, Eric: 5 
INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ('Steve', 'Salesman', 2, NULL), ('Fred', 'Monayman', 5, NULL), ('Lisa', 'Lawya', 7, NULL), ('Kevin', 'Cook', 1, NULL), ('Marshall', 'Manager', 3, NULL), ('Marionne', 'Leader', 6, NULL), ('Eric', 'Enjuhnir', 3, NULL);

SELECT * FROM employee;

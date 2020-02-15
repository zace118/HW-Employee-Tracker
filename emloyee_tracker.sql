drop database if exists tracker_db;

create database tracker_db;

use tracker_db;

-- ------------------------------------------------ 
-- THIS IS GOOD TO GO!!!
drop table department;

create table department (
    id int not null auto_increment,
    empName varchar(30),
    primary key (id)
);

insert into department (empName)
values ('Sales'), ('Finance'), ('Legal'), ('Engineering'), ('Kitchen');

select * from department;

------------------------------------------------ 
-- THIS IS GOOD TO GO!
drop table empRole;

create table empRole (
    id int auto_increment,
    title varchar(30),
    salary decimal(10,2),
    departmentID int,
    primary key (id),
    foreign key (departmentID) references department(id)
);

insert into empRole (title, salary, departmentID)
values ('Sales Lead', 100000.00, 1), ('Sales Associate', 80000.00, 1), ('Lead Engineer', 150000.00, 4), ('Software Engineer', 120000.00, 4), ('Accountant', 125000, 2), ('Legal Team Lead', 250000, 3), ('Lawyer',190000,3);

select * from empRole;

-- ------------------------------------------------ 

drop table employee;

create table employee (
    id int not null auto_increment,
    firstName varchar(30),
    lastName varchar(30),
    roleID int,
    managerID int,
    primary key (id),
    -- constraint FK_emp_RoleID foreign key (roleID) references empRole(departmentID),
    foreign key (roleID) references empRole(departmentID),
    foreign key (managerID) references empRole(id)
);

insert into employee (firstName, lastName, roleID, managerID)
values ('Steve', 'Salesman', 2, null), ('Fred', 'Monayman', 5, null), ('Lisa', 'Lawya', 7, null), ('Kevin', 'Cook', 1, null), ('Marshall', 'Manager', 3, null), ('Marionne', 'Leader', 6, null);

select * from employee;

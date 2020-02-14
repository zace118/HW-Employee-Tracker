drop database if exists department;
drop database if exists employee;
drop database if exists empRole;

create database department;

use department;

create table department (
    id int not null auto_increment,
    empName varchar(30),
    primary key (id)
);

create database employee;

use employee;

create table employee (
    id int not null auto_increment,
    firstName varchar(30),
    lastName varchar(30),
    -- FK
    roleID int,
    -- FK
    managerID int,
    primary key (id)
);

create database  empRole;

use  empRole;

create table empRole (
    id int not null auto_increment,
    title varchar(30),
    salary decimal(7,2),
    -- FK
    departmentID int,
    primary key (id)
);

delete database if exists department;
delete database if exists employee;
delete database if exists empRole;

create database department;

use database department;

create table department (
    id int not null auto_increment,
    empName varchar(30),
    primary key (id)
);

create database employee;

use database employee;

create table employee (
    id int not null auto_increment,
    firstName varchar(30),
    lastName varchar(30),
    roleID int,
    -- FK
    managerID int,
    -- FK
    primary key (id)
);

create database  empRole;

use database  empRole;

create table empRole (
    id int not null auto_increment,
    title varchar(30),
    salary decimal(7,2),
    departmentID int,
    -- FK
    primary key (id)
);

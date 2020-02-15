drop database if exists tracker_db;

create database tracker_db;

use tracker_db;

create table department (
    id int not null auto_increment,
    empName varchar(30),
    primary key (id)
);


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


create table empRole (
    id int not null auto_increment,
    title varchar(30),
    salary decimal(7,2),
    -- FK
    departmentID int,
    primary key (id)
);

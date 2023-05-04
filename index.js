const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeeTrackerDB",
});


const menuOptions = [
    "View all employees",
    "Add employee",
    "Update Employee Role",
    "View all roles",
    "Add role",
    "View all departments",
    "Add department",
    "Update employee managers",
    "View employees by manager",
    "View employees by department",
    "Delete departments",
    "Delete role",
    "Delete employee",
    "View the total utilized budget of a department",
    "Exit",
  ];

  const menuPrompts = [
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: menuOptions,
    },
  ];

  const addRolePrompts = [
    { type: "input", name: "name", message: "What is role name?" },
    { type: "input", name: "salary", message: "What is role salary?" },
    {
      type: "list",
      name: "department_id",
      message: "Which department?",
      choices: [],
    },
  ];
  const addEmployeePrompts = [
    {
      type: "input",
      name: "first_name",
      message: "What is employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is employee's role?",
      choices: allRoles,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who's employee's manager?",
      choices: [],
    },
  ];

  const deleteEmployeePrompts = [
    {
      type: "list",
      name: "chosenOption",
      message: "Which employee would you like to delete?",
      choices: allManagers,
    },
  ];
  const deleteRolePrompts = [
    {
      type: "list",
      name: "chosenOption",
      message: "Which role would you like to delete?",
      choices: allRoles,
    },
  ];
  const deleteDepartmentPrompts = [
    {
      type: "list",
      name: "chosenOption",
      message: "Which department would you like to delete?",
      choices: allDepartments,
    },
  ];

  const viewManagerPrompts = [
    {
      type: "list",
      name: "managerToBeViewed",
      message: "Which manager would you like to view?",
      choices: allManagers,
    },
  ];
  const viewDepartmentPrompts = [
    {
      type: "list",
      name: "departmentToBeViewed",
      message: "Which department would you like to view?",
      choices: allDepartments,
    },
  ];

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

  const menuQuestions = [
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: menuOptions,
    },
  ];

  const addRoleQuestions = [
    { type: "input", name: "name", message: "What is role name?" },
    { type: "input", name: "salary", message: "What is role salary?" },
    {
      type: "list",
      name: "department_id",
      message: "Which department?",
      choices: [],
    },
  ];
  const addEmployeeQuestions = [
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
      choices: [],
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who's employee's manager?",
      choices: [],
    },
  ];

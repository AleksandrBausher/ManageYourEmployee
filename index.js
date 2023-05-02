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

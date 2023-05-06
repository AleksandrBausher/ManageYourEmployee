const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

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

let roles = [];
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
    choices: roles,
  },
  {
    type: "list",
    name: "manager_id",
    message: "Who's employee's manager?",
    choices: [],
  },
];

const addDepartmentPrompts = [
  {
    type: "input",
    name: "department_name",
    message: "What is the department name",
  },
];

let managers = [];
const deleteEmployeePrompts = [
  {
    type: "list",
    name: "chosenOption",
    message: "Which employee would you like to delete?",
    choices: managers,
  },
];
const deleteRolePrompts = [
  {
    type: "list",
    name: "chosenOption",
    message: "Which role would you like to delete?",
    choices: roles,
  },
];
let departments = [];
const deleteDepartmentPrompts = [
  {
    type: "list",
    name: "chosenOption",
    message: "Which department would you like to delete?",
    choices: departments,
  },
];

const viewManagerPrompts = [
  {
    type: "list",
    name: "managerToBeViewed",
    message: "Which manager would you like to view?",
    choices: managers,
  },
];
const viewDepartmentPrompts = [
  {
    type: "list",
    name: "departmentToBeViewed",
    message: "Which department would you like to view?",
    choices: departments,
  },
];

async function viewAllEmployees(db) {
  const [rows, field] = await db.execute("SELECT * from employee");
  console.table(rows);
}

async function addEmployee(db) {
  const newEmployee = await inquirer.prompt(addEmployeePrompts);
  console.log(newEmployee);
}
async function addRole(db) {
  const newRole = await inquirer.prompt(addRolePrompts);
  console.log(newRole);
}
async function addDepartment(db) {
  const newDepartment = await inquirer.prompt(addDepartmentPrompts);
  console.log(newDepartment);
  await db.execute(`INSERT INTO department (name) VALUES ('${newDepartment.department_name}');`)
}

async function viewAllRoles(db) {
  const [rows, field] = await db.execute("SELECT * from role");
  await rows.forEach(async (element) => {
    const [departs, field] = await db.execute(
      `SELECT * from department where id = '${element.department_id}'`
    );
    element.department_id = departs[0].name;
  });
  console.table(rows);
}
async function viewAllDepartments(db) {
  const [rows, field] = await db.execute("SELECT * from department");
  console.table(rows);
}

async function init() {
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employeeTrackerDB",
  });

  const chosenOption = await inquirer.prompt(menuPrompts);
  switch (chosenOption.choice) {
    case menuOptions[0]:
      await viewAllEmployees(db);
      break;
    case menuOptions[1]:
      await addEmployee(db);
      break;
    case menuOptions[2]:
      console.log(menuOptions[2]);
      break;
    case menuOptions[3]:
      await viewAllRoles(db);
      break;
    case menuOptions[4]:
      await addRole(db);
      break;
    case menuOptions[5]:
      await viewAllDepartments(db);
      break;
    case menuOptions[6]:
      await addDepartment(db);
      break;
    case menuOptions[7]:
      console.log(menuOptions[7]);
      break;
    case menuOptions[8]:
      console.log(menuOptions[8]);
      break;
    case menuOptions[9]:
      console.log(menuOptions[9]);
      break;
    case menuOptions[10]:
      console.log(menuOptions[10]);
      break;
    case menuOptions[11]:
      console.log(menuOptions[11]);
      break;
    case menuOptions[12]:
      console.log(menuOptions[12]);
      break;
    case menuOptions[13]:
      console.log(menuOptions[13]);
      break;
    case menuOptions[14]:
      process.exit();
      break;
  }
}

init();
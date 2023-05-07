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

const addDepartmentPrompts = [
  {
    type: "input",
    name: "department_name",
    message: "What is the department name",
  },
];

const deleteEmployeePrompts = [
  {
    type: "list",
    name: "chosenOption",
    message: "Which employee would you like to delete?",
    choices: [],
  },
];
const deleteRolePrompts = [
  {
    type: "list",
    name: "chosenOption",
    message: "Which role would you like to delete?",
    choices: [],
  },
];
const deleteDepartmentPrompts = [
  {
    type: "list",
    name: "chosenOption",
    message: "Which department would you like to delete?",
    choices: [],
  },
];

const viewManagerPrompts = [
  {
    type: "list",
    name: "managerToBeViewed",
    message: "Which manager would you like to view?",
    choices: [],
  },
];
const viewDepartmentPrompts = [
  {
    type: "list",
    name: "departmentToBeViewed",
    message: "Which department would you like to view?",
    choices: [],
  },
];

async function viewAllEmployees(db) {
  const [rows, field] = await db.execute("SELECT * from employee");
  console.table(rows);
}

async function addEmployee(db) {
  const [managers, m] = await db.execute("SELECT * FROM employee");
  const [roles, r] = await db.execute("SELECT * FROM role");
  roles.forEach((element) => {
    element.value = element.id;
    element.name = element.title;
  });
  managers.forEach((element) => {
    element.value = element.id;
    element.name = element.first_name + " " + element.last_name;
  });
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
      choices: managers,
    },
  ];
  const newEmployee = await inquirer.prompt(addEmployeePrompts);
  await db.execute(
    `INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.first_name}","${newEmployee.last_name}",${newEmployee.role_id},${newEmployee.manager_id});`
  );
  console.log(`Employee ${newEmployee.first_name+" "+newEmployee.last_name} added to Database`);
}
async function addRole(db) {
  const [departments, d] = await db.execute("SELECT * FROM department");
  departments.forEach((element) => {
    element.value = element.id;
  });
  const addRolePrompts = [
    { type: "input", name: "name", message: "What is role name?" },
    { type: "input", name: "salary", message: "What is role salary?" },
    {
      type: "list",
      name: "department_id",
      message: "Which department?",
      choices: departments,
    },
  ];
  const newRole = await inquirer.prompt(addRolePrompts);
  await db.execute(
    `INSERT INTO role (title, salary, department_id) VALUES ("${newRole.name}",${newRole.salary},${newRole.department_id});`
  );
  console.log(`Role "${newRole.name}" added to Database`);

}
async function addDepartment(db) {
  const newDepartment = await inquirer.prompt(addDepartmentPrompts);
  await db.execute(
    `INSERT INTO department (name) VALUES ('${newDepartment.department_name}');`
  );
  console.log(`Department "${newDepartment.department_name}" added to Database`);
}

async function viewAllRoles(db) {
  const [rows, field] = await db.execute("SELECT * from role");
  rows.forEach(async function (element) {
    const [departs, field] = await db.execute(
      `SELECT * from department where id = '${element.department_id}'`
    );
    element.department = departs[0].name;
    delete element.department_id;
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
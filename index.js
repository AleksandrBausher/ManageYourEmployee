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
  const [employees, e] = await db.execute("SELECT * from employee");
  const [managers, m] = await db.execute("SELECT * from employee");
  const [roles, r] = await db.execute("SELECT * from role");
  const [departments, d] = await db.execute("SELECT * from department");
  employees.forEach((employee)=>{
    roles.forEach((role)=>{
      if(employee.role_id == role.id){
        employee.title = role.title;
        employee.salary = role.salary
        departments.forEach((department)=>{
          if(role.department_id ==department.id){
            employee.department = department.name
          }
        })
        delete employee.role_id
      }
    })
    managers.forEach((manager)=>{
      if(employee.manager_id == manager.id){
        employee.manager = manager.first_name +" "+manager.last_name
      }
    })
    delete employee.manager_id
  })
  console.table(employees);
}

async function viewAllRoles(db) {
  const [rows, r] = await db.execute("SELECT * from role");
  const [departs, d] = await db.execute(`SELECT * from department`);
  rows.forEach(async function (element) {
    departs.forEach((departElement) => {
      if (element.department_id == departElement.id) {
        element.department = departElement.name;
        delete element.department_id;
      }
    });
  });
  console.table(rows);
}

async function viewAllDepartments(db) {
  const [rows, field] = await db.execute("SELECT * from department");
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
  console.log(
    `Employee ${
      newEmployee.first_name + " " + newEmployee.last_name
    } added to Database`
  );
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
  console.log(
    `Department "${newDepartment.department_name}" added to Database`
  );
}

async function updateEmployeeRole(db) {
  const [employees, e] = await db.execute("SELECT * FROM employee");
  const [roles, r] = await db.execute("SELECT * FROM role");

  employees.forEach((element) => {
    element.value = element.id;
    element.name = element.first_name + " " + element.last_name;
  });

  roles.forEach((element) => {
    element.value = element.id;
    element.name = element.title;
  });

  const updateEmployeeRolePrompts = [
    {
      type: "list",
      name: "id",
      message: "Which employee to update?",
      choices: employees,
    },
    {
      type: "list",
      name: "role",
      message: "Which role would you like to give to the employee?",
      choices: roles,
    },
  ];
  const updatedRole = await inquirer.prompt(updateEmployeeRolePrompts);

  await db.execute(
    `UPDATE employee SET role_id=${updatedRole.role} WHERE id=${updatedRole.id}`
  );

  console.log(`Employee role have been updated`);
}

async function init() {
  const db = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "aleks1981",
    database: "employeeTrackerDB",
  });

  while (true) {
    const chosenOption = await inquirer.prompt(menuPrompts);
    switch (chosenOption.choice) {
      case menuOptions[0]:
        await viewAllEmployees(db);
        break;
      case menuOptions[1]:
        await addEmployee(db);
        break;
      case menuOptions[2]:
        await updateEmployeeRole(db);
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
        process.exit();
        break;
    }
  }
}
init();
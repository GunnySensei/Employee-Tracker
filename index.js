const express = require("express");
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./db/connection");

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//prompts for inquirer start
const appMenu = () => {
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "Select an option below:",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "End Session"
        ]

      }
    ])
    .then((userChoice) => {
      switch (userChoice.menuChoice) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
        case "End Session":
        console.log(`
        ============================
        Thank you for using the app.
        ============================`);  
        break;
      }
    });
};

const viewDepartments = () => {
  const sql = (`SELECT * FROM employee_db.departments`);
  db.query(sql, (err, rows) => {
    if(err) {return err;}
    console.table(rows);
    appMenu();
  })
}

const viewRoles = () => {
  const sql = (`SELECT * FROM employee_db.roles`);
  db.query(sql, (err, rows) => {
    if(err) {return err;}
    console.table(rows);
    appMenu();
  })
}

const viewEmployees = () => {
  const sql = (`SELECT * FROM employee_db.employees`);
  db.query(sql, (err, rows) => {
    if(err) {return err;}
    console.table(rows);
    appMenu();
  })
}

const addDepartment = () => {
  return inquirer
    .prompt([
      {
      type: 'text',
      name: 'department_name',
      message: 'Enter the department name'
    }
  ])
  .then(({department_name}) => {
    const sql = `INSERT INTO departments (department_name) VALUES ('${department_name}')`;
    db.query(sql, (err, rows) => {
      if(err) {
        console.log(err);
        return err;
      }
      console.log(`${department_name} added to Departments`);
      appMenu();
    });
  });
}

const addRole = () => {
  return inquirer
  .prompt([
    {
    type: 'text',
    name: 'job_title',
    message: 'Enter the job title'
  },
  {
    type: 'text',
    name: 'department_id',
    message: 'Enter the department id'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'Enter the salary amount'
  }
])
.then((answers) => {
  const sql = `INSERT INTO roles (job_title, department_id, salary) VALUES ('${answers.job_title}', '${answers.department_id}', '${answers.salary}')`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return err;
    }
    console.log(`${answers.job_title} added to Roles`);
    appMenu();
  });
});
}

const addEmployee = () => {
  return inquirer
  .prompt([
    {
    type: 'text',
    name: 'first_name',
    message: "Enter the employee's first name"
  },
  {
    type: 'text',
    name: 'last_name',
    message:" Enter the employee's last name"
  },
  {
    type: 'input',
    name: 'manager',
    message: "Enter the employee's manager"
  },
  {
    type: 'input',
    name: 'role_id',
    message: "Enter the employee's role id"
  }
])
.then((answers) => {
  const sql = `INSERT INTO employees (first_name, last_name, manager, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.manager}', '${answers.role_id}')`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return err;
    }
    console.log(`${answers.first_name} ${answers.last_name} added to Roles`);
    appMenu();
  });
});
}

const updateEmployeeRole = () => {
  return inquirer
  .prompt([
    {
    type: 'text',
    name: 'first_name',
    message: "Enter the employee's first name"
  },
  {
    type: 'text',
    name: 'last_name',
    message:" Enter the employee's last name"
  },
  {
    type: 'input',
    name: 'manager',
    message: "Enter the employee's manager"
  },
  {
    type: 'input',
    name: 'role_id',
    message: "Enter the employee's role id"
  }
])
.then((answers) => {
  const sql = `INSERT INTO employees (first_name, last_name, manager, role_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.manager}', '${answers.role_id}')`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err);
      return err;
    }
    console.log(`${answers.first_name} ${answers.last_name} added to Roles`);
    appMenu();
  });
});
}

//start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  console.log(`
  ====================== 
  Employee Tracker Mk. 1
  ======================
  `);
  appMenu();
});


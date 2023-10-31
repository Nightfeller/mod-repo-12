const inquirer = require('inquirer');
const mySQL = require('mysql2');

const db = mySQL.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1st/Celeste_Everest/Xth',
      database: 'workshop_db'
    },
    console.log(`Connected to the workshop_db database.`)
  );

const menuItem = [
    {
        type: list,
        message: "Pick your option.",
        name: 'menu',
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add an employee",
            "Add a role",
            "Add a department",
            "Update an employee's role",
            "Quit"
        ]
    }
];

const addEmployee = [
    {
        type: type,
        message: "What's their first name?",
        name: 'newFirstName'
    },
    {
        type: type,
        message: "What's their last name?",
        name: 'newLastName',
    },
    {
        type: type,
        message: "What is their role?",
        name: 'chosenRole',
    },
    {
        type: confirm,
        message: "Will the employee have a manager?",
        name: 'managerOffer'
    }
]

const addDepartment = [
    {
        type: type,
        message: "What's the department's name?",
        name: 'newDepartment'
    }
]

const addRole = [
    {
        type: type,
        message: "What's the role's name?",
        name: "newRole"
    },
    {
        type: type,
        message: "How much will the salary be?",
        name: 'newSalary'
    },
    {
        type: type,
        message: "Which department does this role belong to?",
        name: 'chosenDepartment'
    }
]

const updateEmployee = [
    {
        type: type,
        message: "What will their new role be?",
        name: 'updatedRole'
    },
    {
        type: confirm,
        message: "Will the manager be changed?",
        name: 'managerOffer'
    }
]

const managers = [
    {
        type: type,
        message: "What is the manager's first name? Leave blank for no manager.",
        name: "managerFirstName"
    },
    {
        type: type,
        message: "What is the manager's last name?",
        name: "managerLastName"
    }
]

// function addingEmployee(ae) {
//     inquirer.prompt(addEmployee).then((res) => {

//     });
// }

// function mainList() {
//     inquirer.prompt(mainList).then((res) => {
//         if (res.menu == "View all employees") {
//             db.query(
//                 `SELECT employee.id, first_name, last_name, title, department_name, salary FROM employee
//                 JOIN role ON employee.role_id = role.id
//                 JOIN department ON role.department_id = department.id;`
//             , (err, results) => {
//                 if (err) console.log(err);
//                 else console.log(results);
//             });
//         } else if (res.menu == "View all roles") {
//             db.query(
//                 `SELECT role.id, title, department_name, salary FROM role
//                 JOIN department ON role.department_id = department.id;`
//             , (err, results) => {
//                 if (err) console.log(err);
//                 else console.log(results);
//             });
//         } else if (res.menu == "View all departments") {
//             db.query(`SELECT department.id, department_name FROM department;`, (err, results) => {
//                 if (err) console.log(err);
//                 else console.log(results);
//             });
//         } else if (res.menu == "Add an employee") {
//             db.query(
//                 `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//                 VALUE (?, ?, ?, ?);`
//             , res.newFirstName, res.newLastName, res.chosenRole,);
//         }
//     }).catch(error => {
//         console.log(error);
//     });
// }

mainList();
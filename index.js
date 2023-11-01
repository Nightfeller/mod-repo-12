// const mySQL = require('mysql2');


// const db = mySQL.createConnection(
//     {
//       host: 'localhost',
//       user: 'root',
//       password: 'rootroot',
//       database: 'workshop_db'
//     },
//     console.log(`Connected to the workshop_db database.`)
//   );

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

mainList(menuItem, managers, addEmployee, addRole);
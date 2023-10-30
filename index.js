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
        // Main List

        type: list,
        message: "Pick your option.",
        name: 'MainList',
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
    },
    {
        // Add an employee

        type: type,
        message: "What's their first name?",
        name: 'newFirstName',

        type: type,
        message: "What's their last name?",
        name: 'newLastName',

        type: type,
        message: "What is their role?",
        name: 'chosenRole',

        type: list,
        message: "Will the employee have a manager? Enter their first and last names.",
        name: 'managerOffer',
        choices: [
            "Yes",
            "No"
        ],

        type: type,
        message: "Who will be their manager?",
        name: 'chosenManager'
    },
    {
        // Add a department

        type: type,
        message: "What's the department's name?",
        name: 'newDepartment'
    },
    {
        // Add a role


        type: type,
        message: "What's the role's name?",
        name: "newRole",

        type: type,
        message: "How much will the salary be?",
        name: 'newSalary',

        type: type,
        message: "Which department does this role belong to?",
        name: 'chosenDepartment'
    },
    {
        // Update an employee's role

        type: type,
        message: "What will their new role be?",
        name: 'updatedRole',
        
        type: list,
        message: "Will the manager be changed?",
        name: 'managerChoice',
        choices: [
            "Yes",
            "No"
        ],

        type: type,
        message: "Who will the new manager be? Enter their first and last names.",
        name: "updatedManager"
    }
];

inquirer.prompt();
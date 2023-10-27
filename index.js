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
];

inquirer.prompt();
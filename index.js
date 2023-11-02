const inquirer = require('inquirer');
const mySQL = require('mysql2');

const db = mySQL.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '1st/Celeste_Everest/Xth',
      database: 'workshop_db'
    }
  );

let roleArray = [];
let managerArray = ["None"];

managerConfig(managerArray);

function managerConfig(mA) {
    db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let l = 0; l < results[0].length; l++) {
            mA.push(results[0][l].first_name + " " + results[0][l].last_name);
        }
        console.log(mA);
    }).catch(err => console.log(err));
}

function roleConfig(rA) {
    db.promise().query(`SELECT id, title FROM role;`).then(results => {
        for (let i = 0; i < results[0].length; i++) {
            rA.push(results[0][i].title);
        }
        // console.log(rA);
        return rA;
    }).catch(err => console.log(err));
}

function roleConfirmation(rI) {
    db.promise().query(`SELECT id, title FROM role;`).then(results => {
        for (let j = 0; j < results[0].length; j++) {
            if (results[0][j].title == rI) {
                return results[0][j].id;
            } else {
                console.log("ID not found.");
                mainList();
            }
        }
    }).catch(err => console.log(err));
}

function managerConfirmation(mI) {
    db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let k = 0; k < results[0].length; k++) {
            if (results[0][k].first_name + " " + results[0][k].last_name == mI) {
                return results[0][k].id;
            } else if (mI == "None") {
                return null;
            } else {
                console.log("ID not found.");
                mainList();
            }
        }
    }).catch(err => console.log(err));
}

roleConfig(roleArray);
//console.log(roleArray);

const menuItem = [
    {
        type: 'list',
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
        type: 'input',
        message: "What's their first name?",
        name: 'newFirstName'
    },
    {
        type: 'input',
        message: "What's their last name?",
        name: 'newLastName',
    },
    {
        type: 'list',
        message: "What is their role?",
        name: 'chosenRole',
        choices: roleArray
    },
    {
        type: 'list',
        message: "Who will be their manager?",
        name: 'chosenManager',
        choices: managerArray
    }
]

const addDepartment = [
    {
        type: 'input',
        message: "What's the department's name?",
        name: 'newDepartment'
    }
]

const addRole = [
    {
        type: 'input',
        message: "What's the role's name?",
        name: "newTitle"
    },
    {
        type: 'input',
        message: "How much will the salary be?",
        name: 'newSalary'
    },
    {
        type: 'input',
        message: "Which department does this role belong to?",
        name: 'chosenDepartment'
    }
]

const updateEmployee = [
    {
        type: 'list',
        message: "Who's role will be updated?",
        name: 'updatedEmployee',
        choices: []
    },
    {
        type: 'list',
        message: "What will their new role be?",
        name: 'updatedRole',
        choices: []
    },
    {
        type: 'confirm',
        message: "Will the manager be changed?",
        name: 'updatedManager',
        choices: []
    }
]

//
// I had to add this from function.js because the export didn't work for some reason.
//



// function roleConfig() {
//     db.promise().query(`SELECT id, title FROM role;`).then(results => {
//         let roleArr = [];
//         for(let i = 0; i < results[0].length; i++) {
//             roleArr.push(results[0][i].title);
//         }
//         // console.log(roleArr);
//         return roleArr;
//     });
// }

function departmentConfig() {
    
}

function mainList(mL, ae, ar, ad, ue) {
    inquirer.prompt(mL).then(res => {
        // Views all employees
        if (res.menu == "View all employees") {
            db.promise().query(
                `SELECT employee.id, first_name, last_name, title, department_name, salary FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id;`
            ).then(results => {
                console.log(results);
                mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
            }).catch(err => console.log(err));
        // Views all roles
        } else if (res.menu == "View all roles") {
            db.promise().query(
                `SELECT role.id, title, department_name, salary FROM role
                JOIN department ON role.department_id = department.id;`
            ).then(results => {
                console.log(results);
                mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
            }).catch(err => console.log(err));
        // Views all departments
        } else if (res.menu == "View all departments") {
            db.promise().query(`SELECT department.id, department_name FROM department;`).then(results => {
                console.log(results);
                mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
            }).catch(err => console.log(err));
        // Adds an employee
        } else if (res.menu == "Add an employee") {
            inquirer.prompt(ae).then(resp => {
                let roleID = roleConfirmation(resp.chosenRole);
                let managerID = managerConfirmation(resp.chosenManager);
                console.log(roleID);
                console.log(managerID);
                db.promise().query(
                    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUE (?, ?, ?, ?);`
                , /* [resp.newFirstName, resp.newLastName, roleID, managerID] */).then(results => {
                    console.log(results);
                    mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Adds a role
        } else if (res.menu == "Add a role") {
            inquirer.prompt(ar).then(resp => {
                let departmentID = departmentConfig(res.chosenDepartment);
                db.promise().query(
                    `INSERT INTO role (title, department_id, salary)
                    VALUE (?, ?, ?);`
                , [resp.newTitle, departmentID, resp.newSalary]).then(results => {
                    console.log(results);
                    mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Adds a department
        } else if (res.menu == "Add a department") {
            inquirer.prompt(ad).then(resp => {
                db.promise().query(
                    `INSERT INTO department (department_name)
                    VALUE (?);`
                , resp.newDepartment).then(results => {
                    console.log(results);
                    mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Updates a current employee's role
        } else if (res.menu == "Update an employee's role") {
            inquirer.prompt(ue).then(resp => {
                let roleID = roleConfig(resp.updatedRole);
                let managerID;
                if (resp.managerOffer) {
                    managerID = managerConfig(ma);
                } else {
                    managerID = null;
                }
                db.promise().query(
                    `UPDATE employee SET role_id = ?, manager_id = ? WHERE ? + ?;`
                , [roleID, managerID, resp.updatedFirstName, resp.updatedLastName]).then(results => {
                    console.log(results);
                    mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Leaves the mySQL instance
        } else if (res.menu == "Quit") {
            process.exit();
        } else {
            res.status(404).json({ "message": "404 not found"});
        }
    }).catch(error => {
        console.log(error);
    });
}

db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});

// roleConfig();
mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
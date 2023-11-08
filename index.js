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
let departmentArray = [];
let employeeArray = [];

// This and employeeConfig() are functionally the same.
function managerConfig(mA) {
    db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let l = 0; l < results[0].length; l++) {
            mA.push(results[0][l].first_name + " " + results[0][l].last_name);
        }
        // console.log(mA);
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

function departmentConfig(dA) {
    db.promise().query(`SELECT id, department_name FROM department;`).then(results => {
        for (let j = 0; j < results[0].length; j++) {
            dA.push(results[0][j].department_name);
        }
        // console.log(dA);
        return dA;
    }).catch(err => console.log(err));
}

// This and managerConfig() are functionally the same.
function employeeConfig(eA) {
    db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let k = 0; k < results[0].length; k++) {
            eA.push(results[0][k].first_name + " " + results[0][k].last_name);
        }
        console.log(eA);
        return eA;
    }).catch(err => console.log(err));
}

function departmentConfirmation(dI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, department_name FROM department;`).then(results => {
        for (let conf in results[0]) {
            if (results[0][conf].department_name == dI) {
                idValue = results[0][conf].id;
                console.log("-----=========-----");
                console.log(dI);
                console.log(results[0][conf].department_name);
                console.log(idValue);
                console.log(results[0][conf].id);
                console.log("-----=========-----");
            }
        }
        return idValue;
    }).catch(err => console.log(err));
}

function roleConfirmation(rI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, title FROM role;`).then(results => {
        for (let conf in results[0]) {
            if (results[0][conf].title == rI) {
                // console.log("-----=========-----");
                // console.log(rI);
                // console.log(results[0][conf].id);
                idValue = results[0][conf].id;
                // console.log(idValue);
                // console.log('-----=========-----');
            }
        }
        return idValue;
    }).catch(err => console.log(err));
}

function managerConfirmation(mI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let conf in results[0]) {
            if (results[0][conf].first_name + " " + results[0][conf].last_name == mI) {
                idValue = results[0][conf].id;
                // console.log("-----=========-----");
                // console.log(idValue);
                // console.log(mI);
                // console.log(results[0][conf].id);
                // console.log(results[0][conf].first_name + " __ " + results[0][conf].last_name);
                // console.log("-----=========-----");
            }
        }
        if (mI == "None") {
            idValue = null;
        }
        return idValue;
    }).catch(err => console.log(err));
}


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
        type: 'list',
        message: "Which department does this role belong to?",
        name: 'chosenDepartment',
        choices: departmentArray
    }
]

const updateEmployee = [
    {
        type: 'list',
        message: "Who's role will be updated?",
        name: 'updatedEmployee',
        choices: employeeArray
    },
    {
        type: 'list',
        message: "What will their new role be?",
        name: 'updatedRole',
        choices: roleConfig
    },
    {
        type: 'confirm',
        message: "Will the manager be changed?",
        name: 'updatedManager',
        choices: managerConfig
    }
]

//
// I had to add this from function.js because the export didn't work for some reason.
//

// function getEmployeeConfirm(r, m) {
//     if(r != undefined && m != undefined) {
//         return true;
//     } else {
//         return false;
//     }
// }

// function roleConfig() {
//     db.promise().query(`SELECT id, title FROM role;`).then(results => {
//         let roleArr = [];
//         for(let i = 0; i < results[0].length; i++) {
//             roleArr.push(results[0][i].title);
//         }
//         // console.log(roleArr);
//         return roleArr;
//     });

function mainList(mL, ae, ar, ad, ue) {

    roleConfig(roleArray);
    managerConfig(managerArray);
    departmentConfig(departmentArray);
    employeeConfig(employeeArray);

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
            inquirer.prompt(ae).then(async resp => {
                let roleID;
                let managerID;
                let employeeName = [];
                roleID = await roleConfirmation(resp.chosenRole, roleID);
                managerID = await managerConfirmation(resp.chosenManager, managerID);
                employeeName = await employeeConfirmation();
                
                // console.log([resp.newFirstName, resp.newLastName, roleID, managerID]);
                await db.promise().query(
                        `UPDATE employee
                        SET role_id = ?, manager_id = ?
                        WHERE ? + ?;`
                    , [resp.newFirstName, resp.newLastName, roleID, managerID]).then(results => {
                        // console.log([resp.newFirstName, resp.newLastName, roleID, managerID]);
                        console.log(results);
                        mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                    }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Adds a role
        } else if (res.menu == "Add a role") {
            inquirer.prompt(ar).then(async resp => {
                let departmentID;
                departmentID = await departmentConfirmation(resp.chosenDepartment);

                // console.log([resp.newTitle, departmentID, resp.newSalary]);
                await db.promise().query(
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
            inquirer.prompt(ue).then(async resp => {
                let roleID;
                let managerID;
                roleID = await roleConfirmation(resp.updatedRole, roleID);
                managerID = await managerConfirmation(resp.updatedManager, managerID);

                await db.promise().query(
                    `UPDATE employee SET role_id = ?, manager_id = ? WHERE ? + ?;`
                , /* [roleID, managerID, resp.updatedFirstName, resp.updatedLastName] */).then(results => {
                    console.log(results);
                    mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Leaves the node instance
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
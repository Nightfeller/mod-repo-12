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

roleConfig(roleArray);
managerConfig(managerArray);
employeeConfig(employeeArray);
departmentConfig(departmentArray);

// This and employeeConfig() are functionally the same.
function managerConfig(mA) {
    db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let mc = 0; mc < results[0].length; mc++) {
            mA.push(results[0][mc].first_name + " " + results[0][mc].last_name);
        }
    }).catch(err => console.log(err));
}

function roleConfig(rA) {
    db.promise().query(`SELECT id, title FROM role;`).then(results => {
        for (let rc = 0; rc < results[0].length; rc++) {
            rA.push(results[0][rc].title);
        }
        return rA;
    }).catch(err => console.log(err));
}

function departmentConfig(dA) {
    db.promise().query(`SELECT id, department_name FROM department;`).then(results => {
        for (let dc = 0; dc < results[0].length; dc++) {
            dA.push(results[0][dc].department_name);
        }
        return dA;
    }).catch(err => console.log(err));
}

// This and managerConfig() are functionally the same.
function employeeConfig(eA) {
    db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let ec = 0; ec < results[0].length; ec++) {
            eA.push(results[0][ec].first_name + " " + results[0][ec].last_name);
        }
        return eA;
    }).catch(err => console.log(err));
}

function employeeConfirmation(eI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let eConf in results[0]) {
            if (results[0][eConf].first_name + " " + results[0][eConf].last_name == eI) {
                idValue = results[0][eConf].id;
            }
        }
        return idValue;
    }).catch(err => console.log(err));
}

function departmentConfirmation(dI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, department_name FROM department;`).then(results => {
        for (let dConf in results[0]) {
            if (results[0][dConf].department_name == dI) {
                idValue = results[0][dConf].id;
            }
        }
        return idValue;
    }).catch(err => console.log(err));
}

function roleConfirmation(rI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, title FROM role;`).then(results => {
        for (let rConf in results[0]) {
            if (results[0][rConf].title == rI) {
                idValue = results[0][rConf].id;
            }
        }
        return idValue;
    }).catch(err => console.log(err));
}

function managerConfirmation(mI, idValue) {
    console.log(idValue);
    return db.promise().query(`SELECT id, first_name, last_name FROM employee;`).then(results => {
        for (let mConf in results[0]) {
            if (results[0][mConf].first_name + " " + results[0][mConf].last_name == mI) {
                idValue = results[0][mConf].id;
            }
        }
        if (mI == "None") {
            idValue = null;
        }
        return idValue;
    }).catch(err => console.log(err));
}

function respondWithTable(results) {
        const transformed = results.reduce((acc, {id, ...x}) => { acc[id] = x; return acc}, {});
        console.table(transformed);
}

function EmployeeRegestration(firstName, lastName, roleID, managerID) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
}

function RoleRegestration(roleName, departmentID, salary) {
    this.roleName = roleName;
    this.departmentID = departmentID;
    this.salary = salary;
}

function DepartmentRegestration(departmentName) {
    this.departmentName = departmentName;
}

function UpdateRegestration(roleID, managerID, employeeID) {
    this.roleID = roleID;
    this.managerID = managerID;
    this.employeeID = employeeID;
}

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
        choices: roleArray
    },
    {
        type: 'list',
        message: "Who will be the new manager?",
        name: 'updatedManager',
        choices: managerArray
    }
]

//
// I had to add this from function.js a because the export didn't work for some reason.
//

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
                respondWithTable(results[0]);
                mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
            }).catch(err => console.log(err));
        // Views all roles
        } else if (res.menu == "View all roles") {
            db.promise().query(
                `SELECT role.id, title, department_name, salary FROM role
                JOIN department ON role.department_id = department.id;`
            ).then(results => {
                respondWithTable(results[0]);
                mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
            }).catch(err => console.log(err));
        // Views all departments
        } else if (res.menu == "View all departments") {
            db.promise().query(`SELECT department.id, department_name FROM department;`).then(results => {
                respondWithTable(results[0]);
                mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
            }).catch(err => console.log(err));
        // Adds an employee
        } else if (res.menu == "Add an employee") {
                roleArray = [];
                managerArray = ["None"];
                roleConfig(roleArray);
                managerConfig(managerArray);
            inquirer.prompt(ae).then(async resp => {
                
                let roleID;
                let managerID;
                roleID = await roleConfirmation(resp.chosenRole, roleID);
                managerID = await managerConfirmation(resp.chosenManager, managerID);
                
                await db.promise().query(
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUE (?, ?, ?, ?);`
                    , [resp.newFirstName, resp.newLastName, roleID, managerID]).then(results => {
                        // console.log([resp.newFirstName, resp.newLastName, roleID, managerID]);
                        const newEmployee = new EmployeeRegestration(resp.newFirstName,  resp.newLastName, roleID, managerID);
                        console.table(newEmployee);
                        mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                    }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Adds a role
        } else if (res.menu == "Add a role") {
            departmentArray = [];

            departmentConfig(departmentArray);
            inquirer.prompt(ar).then(async resp => {
                let departmentID;
                departmentID = await departmentConfirmation(resp.chosenDepartment);

                await db.promise().query(
                    `INSERT INTO role (title, department_id, salary)
                    VALUE (?, ?, ?);`
                , [resp.newTitle, departmentID, resp.newSalary]).then(results => {
                    const newRole = new RoleRegestration(resp.newTitle, departmentID, resp.newSalary);
                    console.table(newRole);
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
                    const newDepartment = new DepartmentRegestration(resp.newDepartment);
                    console.log(newDepartment);
                    mainList(menuItem, addEmployee, addRole, addDepartment, updateEmployee);
                }).catch(err => console.log(err));
            }).catch(erro => console.log(erro));
        // Updates a current employee's role
        } else if (res.menu == "Update an employee's role") {
            roleArray = [];
            managerArray = ["None"];
            employeeArray = [];

            roleConfig(roleArray);
            managerConfig(managerArray);
            employeeConfig(employeeArray);
            inquirer.prompt(ue).then(async resp => {
                let roleID;
                let managerID;
                let employeeID;
                roleID = await roleConfirmation(resp.updatedRole, roleID);
                managerID = await managerConfirmation(resp.updatedManager, managerID);
                employeeID = await employeeConfirmation(resp.updatedEmployee, employeeID);

                console.log([roleID, managerID, employeeID]);
                await db.promise().query(
                    `UPDATE employee SET role_id = ?, manager_id = ? WHERE employee.id = ?;`
                , [roleID, managerID, employeeID]).then(results => {
                    const updatedEmployee = new UpdateRegestration(roleID, managerID, employeeID);
                    console.log(updatedEmployee);
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
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

function managerConfig(m) {
    inquirer.prompt(m).then((res) => {
        db.promise().query(`SELECT * FROM employee`).then(results => {
            for (let i = 0; i < results.length; i++) {
                if (res.managerFirstName == results[i].first_name && res.managerLastName == results[i].last_name) {
                    return results[i].id;
                } else if (res.managerFirstName == undefined) {
                    return null;
                } else {
                    console.log("Error 404: Name not found.");
                }
            }   
        }).catch(err => console.log(err));
    });
}

function roleConfig(r) {
    db.promise().query(`SELECT * FROM role`).then(results => {
        for (let j = 0; j < results.length; j++) {
            if (r == results[j].title) {
                return results[j].id;
            } else {
                console.log("Error 404: Title not found.")
            }
        }
    }).catch(err => console.log(err));
}

function departmentConfig(d) {
    db.promise().query().then(results => {}).catch(err => console.log(err));
}

function mainList(mL, ma, ae, ar) {
    inquirer.prompt(mL).then(res => {
        // Views all employees
        if (res.menu == "View all employees") {
            db.promise().query(
                `SELECT employee.id, first_name, last_name, title, department_name, salary FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id;`
            ).then(results => console.log(results)).catch(err => console.log(err));
        // Views all roles
        } else if (res.menu == "View all roles") {
            db.promise().query(
                `SELECT role.id, title, department_name, salary FROM role
                JOIN department ON role.department_id = department.id;`
            ).then((results) => console.log(results)).catch(err => console.log(err));
        // Views all departments
        } else if (res.menu == "View all departments") {
            db.promise().query(`SELECT department.id, department_name FROM department;`).then((results) => console.log(results)).catch(err => console.log(err));
        // Adds an employee
        } else if (res.menu == "Add an employee") {
            inquirer.prompt(ae).then(resp => {
                let roleID = roleConfig(resp.chosenRole);
                let managerID;
                if (resp.managerOffer) {
                    managerID = managerConfig(ma);
                } else {
                    managerID = null;
                }
                db.promise().query(
                    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUE (?, ?, ?, ?);`
                , resp.newFirstName, resp.newLastName, roleID, managerID).then(results => console.log(results)).catch(err => console.log(err));
            });
        // Adds a role
        } else if (res.menu == "Add a role") {
            inquirer.prompt(ar).then(resp => {
                let departmentID = departmentConfig();
                db.promise().query().then(results => console.log(results)).catch(err => console.log(err));
            });
        // Adds a department
        } else if (res.menu == "Add a department") {
            console.log("It does nothing for now.");
        // Updates a current employee's role
        } else if (res.menu == "Update an employee's role") {
            console.log("It does nothing for now.");
        // Leaves the mySQL instance
        } else if (res.menu == "Quit") {
            db.promise().query(`quit`).then(q => console.log(q)).catch(err => console.log(err));
        }
    }).catch(error => {
        console.log(error);
    });
}

module.exports = mainList;
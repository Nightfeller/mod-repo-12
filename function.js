function managerConfig(m) {
    inquirer.prompt(m).then((res) => {
        db.query(`SELECT * FROM employee`, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                for (let i = 0; i < results.length; i++) {
                    if (res.managerFirstName == results[i].first_name && res.managerLastName == results[i].last_name) {
                        return results[i].id;
                    }
                }   
            }
        }).then((res) => console.log(res));
    });
}

function addingEmployee(aE) {
    inquirer.prompt(aE).then((res) => {
        if (res.managerOffer) {
            managerConfig(managers).then((ret) => {
                
            });
        }
    });
}

function mainList(mL) {
    inquirer.prompt(mL).then((res) => {
        if (res.menu == "View all employees") {
            db.query(
                `SELECT employee.id, first_name, last_name, title, department_name, salary FROM employee
                JOIN role ON employee.role_id = role.id
                JOIN department ON role.department_id = department.id;`
            , (err, results) => {
                if (err) console.log(err);
                else console.log(results);
            });
        } else if (res.menu == "View all roles") {
            db.query(
                `SELECT role.id, title, department_name, salary FROM role
                JOIN department ON role.department_id = department.id;`
            , (err, results) => {
                if (err) console.log(err);
                else console.log(results);
            });
        } else if (res.menu == "View all departments") {
            db.query(`SELECT department.id, department_name FROM department;`, (err, results) => {
                if (err) console.log(err);
                else console.log(results);
            });
        } else if (res.menu == "Add an employee") {
            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUE (?, ?, ?, ?);`
            , res.newFirstName, res.newLastName, res.chosenRole,);
        }
    }).catch(error => {
        console.log(error);
    });
}
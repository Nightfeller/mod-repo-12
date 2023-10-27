SELECT employee.id, first_name, last_name, title, department_name, salary FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;

SELECT role.id, title, department_name, salary FROM role
JOIN department ON role.department_id = department.id;

SELECT * FROM department;
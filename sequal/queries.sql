-- View all employees

SELECT employee.id, first_name, last_name, title, department_name, salary FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;

-- View all roles

SELECT role.id, title, department_name, salary FROM role
JOIN department ON role.department_id = department.id;

-- View all departments

SELECT department.id, department_name FROM department;

-- Update an employee's role

UPDATE employee
SET role_id = ?, manager_id = ?
WHERE ? + ?;

-- Add an employee

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE (?, ?, ?, ?);

-- Add a role

INSERT INTO role (title, department_id, salary)
VALUE (?, ?, ?);

-- Add a department

INSERT INTO department (department_name)
VALUE (?);

-- Quit
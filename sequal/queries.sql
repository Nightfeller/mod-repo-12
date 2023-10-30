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
SET ${role_id} = ${role_id_replacement}, ${manager_id} = ${manager_id_replacement}
WHERE ${first_name} + ${last_name};

-- Add an employee

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE (${new_first_name}, ${new_last_name}, ${chosen_role}, ${chosen_manager});

-- Add a role

INSERT INTO role (title, department_id, salary)
VALUE (${new_title}, ${chosen_department_id}, ${new_salary});

-- Add a department

INSERT INTO department (department_name)
VALUE (${new_department_name});
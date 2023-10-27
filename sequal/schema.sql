DROP DATABASE IF EXISTS workshop_db;
CREATE DATABASE workshop_db;

USE workshop_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

SELECT DATABASE();

-- source C:\Users\Peter Earls\bootcamp\challenge-twelve\mod-repo-12\sequal\schema.sql

-- source C:\Users\Peter Earls\bootcamp\challenge-twelve\mod-repo-12\sequal\seeds.sql

-- source C:\Users\Peter Earls\bootcamp\challenge-twelve\mod-repo-12\sequal\query.sql
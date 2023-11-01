<!-- Pseudo I -->

FIRST, the user picks an option from the main list.

IF that option is to view, THEN the respective table in the database is shown.

ELSE IF the option to add an employee, THEN the user is asked to write in the first and last name of the new employee...
    IF given the title of the role, THEN the program checks all roles in the database and compares the given title name to any of the title names in the role...
        IF none exist, send a 404 error and restart from the main list.
        ELSE return the role id to the query.
    IF given the manager's first and last name...
        IF the first name is unlisted, THEN the manager id is set to null.
        ELSE the program checks all employees in the database and compares the given names to the names in the employee list...
            IF none exist, send a 404 error and restart from the main list.
            ELSE return the employee id to the query.
    IF the first name, last name, role id, and manager id is in place, THEN the parameters will go into a query and be placed in the employee list, THEN said list will be shown.

<!-- Pseudo II -->

WHEN the option to pick a manager is chosen...
    IF the answer is true, THEN the user is asked for the manager's first and last name...
        THEN the program checks if such an employee exists...
            IF the employee exists, THEN the employee's id is returned and made the manager id.
            ELSE sends a 404 error and restarts from the main list
    ELSE the manager's id is set to null.
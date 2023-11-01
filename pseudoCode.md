FIRST, the user picks an option from the main list.

IF that option is to view, THEN the respective table in the database is shown.

ELSE IF the option to add an employee, THEN the user is asked to write in the first and last name of the new employee...
    IF given the title of the role, THEN the program checks all roles in the database and compares the given title name to any of the title names in the role...
        IF none exist, send a 404 error and restart from the main list.
        ELSE return the role id to the query.
    IF given the manager's first and last name...
        IF the first name is unlisted, THEN the manager id is set to null.
        ELSE the program checks all employees in the database and compares the given names to the names in the employee list...
            IF none exist, send a 404 error and restart from the beginning of the question line.
            ELSE return the employee id to the query.
    IF the first name, last name, role id, and manager id is in place, THEN the parameters will go into a query and be placed in the employee list, THEN said list will be shown.


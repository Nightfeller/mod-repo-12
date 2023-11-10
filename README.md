# Employee Tracker [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a program for tracking employees. If allows users to view employee, role, and department databases
## Installation

To start, use ``` Ctrl + Shift + ` ``` to open up the Integrated Terminal. If you can't find where the backtick symbol is on your keyboard, it's usually to the left of the *1* key and above the *Tab* key.

Inside the terminal, you should see that it is in Powershell. To change it to Git Bash, go to the plus icon and click on the arrow besides it. There click on the option, *Git Bash*, to change the terminal to the compatible CLI.

Next, type in the terminal `npm install` or `npm i` to install the correct packages and dependancies. If any problems come up, follow the terminal instructions and use `npm audit fix` and/or `npm audit fix --force` to solve the problem. The instructions might also tell you to use `npm fund`. However, that is not needed.

You will also need to split the terminal to run mySQL. In order to do that, use `Ctrl + Shift + 5` in a terminal instance to split it into two seperate terminal. After that, run the code `mysql -u <username> -p`.

### Note

You will need a mySQL user for this program. If you don't already have one, go to [this link here](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) to create a new user.
## Usage

The first thing you should do is run the command `scource sequal\schema.sql` in the mysql terminal. Then, run `source sequal\seeds.sql` to seed in the database. Don't worry about `queries.sql`, those commands are run in the `index.js` file.

To actually use the back end, see [this video here](https://drive.google.com/file/d/1bAy-i3MCTs1-JH0JjHUlbGMEKLkiDiqy/view) for a simple walkthrough.

### Notice

There is a bug where if you create a role right after creating a department, the newly created department won't initially appear when selecting a department to add. The most simplest solution is to hold the *Down Arrow* key for a second or two to allow the program to update mid-process.

# Credits

There is no one to give credits to.
## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?


 
 ## License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This program is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


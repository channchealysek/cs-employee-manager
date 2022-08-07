const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const getInputTask = require('../../lib/UserInputTask')

// function to show all employees 
employeeGRUD = (choices) => {
    if (choices === "View all employees") {
        console.log('Showing all employees...\n');
        const sql = `SELECT employees.id, 
                          employees.first_name, 
                          employees.last_name, 
                          roles.title, 
                          departments.name AS department,
                          roles.salary, 
                          CONCAT (managers.first_name, " ", managers.last_name) AS manager
                   FROM employees
                          LEFT JOIN roles ON employees.role_id = roles.id
                          LEFT JOIN departments ON roles.department_id = departments.id
                          LEFT JOIN employees managers ON employees.manager_id = managers.id`;

        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);

            // return command or exit
            inquirer.prompt([
                {
                    type: "list",
                    name: "menuChoices",
                    message: "Please choose an option below:",
                    choices: ["Return to menu", "Exit"],
                    validate: menuChoices => {
                        if (menuChoices === "Return to menu") {
                            return true;
                        }
                        else if (menuChoices === "Exit") {
                            return true;
                        }
                        else {
                            return false;
                        };
                    }
                }
            ]).then(function (_getUserChoiced) {
                if (_getUserChoiced.menuChoices === "Return to menu") {
                    getInputTask();
                } else {
                    process.exit();
                };
            });
        });

    }
};

module.exports = employeeGRUD;
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const getInputTask = require('../../lib/UserInputTask');
const Choice = require('inquirer/lib/objects/choice');

// function to show all departments 
roleGRUD = (choices) => {

    // function to show all roles 
    if (choices === "View all roles") {
        console.log('Showing all roles...\n');

        const sql = `SELECT roles.id, roles.title, departments.name AS department
                 FROM roles
                 INNER JOIN departments ON roles.department_id = departments.id`;

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
        })

    }
};

module.exports = roleGRUD;
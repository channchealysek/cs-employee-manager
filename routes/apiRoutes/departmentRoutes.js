const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const getInputTask = require('../../lib/UserInputTask')

// function to show all departments 
departmentGRUD = (choices) => {
  if (choices === "View all departments") {
    console.log('Showing all departments...\n');
    const sql = `SELECT departments.id AS ID, departments.name AS Departments FROM departments`;
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
        if(_getUserChoiced.menuChoices === "Return to menu"){
          getInputTask();
        }else{
          process.exit();
        };
      });
    });
  }
};

module.exports = departmentGRUD;
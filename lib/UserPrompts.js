const inquirer = require('inquirer');
const getInputTask = require('./../lib/UserInputTask')

const userPrompt = () => {
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
        console.clear();
        getInputTask();
      } else {
        console.clear();
        process.exit();
      };
    });
  }

  module.exports = userPrompt;
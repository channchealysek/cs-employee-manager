const inquirer = require('inquirer');
const userInputTask = [{
  type: 'list',
  pageSize: 14,
  name: 'choices',
  message: 'What would you like to do?',
  choices: ['View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Update an employee manager',
    "View employees by department",
    'Delete a department',
    'Delete a role',
    'Delete an employee',
    'View department budgets',
    'Exit']
}];

const getInputTask = () => {
  console.clear();
  console.log("|---------------------------------|");
  console.log("|                                 |");
  console.log("|        EMPLOYEE MANAGER         |");
  console.log("|                                 |");
  console.log("|---------------------------------|\n");
  return inquirer.prompt(
    userInputTask
  )
    .then((_answer) => {
      const { choices } = _answer;
      employeeGRUD(choices);
      departmentGRUD(choices);
      roleGRUD(choices);
      
      if (choices === "Exit") {
        console.clear();
        process.exit();
        
      };

    });
};



module.exports = getInputTask;
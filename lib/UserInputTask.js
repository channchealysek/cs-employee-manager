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
  console.log("|---------------------------------|")
  console.log("|                                 |")
  console.log("|        EMPLOYEE MANAGER         |")
  console.log("|                                 |")
  console.log("|---------------------------------|\n")
  return inquirer.prompt(
    userInputTask
  )
    .then((_answer) => {
      const { choices } = _answer;
      if (choices === "View all departments") {
        departmentGRUD(choices);
      }
      if (choices === "View all roles") {
        roleGRUD(choices);
      }

      if (choices === "View all employees") {
        employeeGRUD(choices);
      }

      if (choices === "Add a department") {
        addDepartment(choices);
      }

      if (choices === "Add a role") {
        addRole();
      }

      if (choices === "Add an employee") {
        addEmployee();
      }

      if (choices === "Update an employee role") {
        updateEmployee();
      }

      if (choices === "Update an employee manager") {
        updateManager();
      }

      if (choices === "View employees by department") {
        employeeDepartment();
      }

      if (choices === "Delete a department") {
        deleteDepartment();
      }

      if (choices === "Delete a role") {
        deleteRole();
      }

      if (choices === "Delete an employee") {
        deleteEmployee();
      }

      if (choices === "View department budgets") {
        viewBudget();
      }

      if (choices === "Exit") {
        console.clear();
        process.exit();
        
      };
    });
};



module.exports = getInputTask;
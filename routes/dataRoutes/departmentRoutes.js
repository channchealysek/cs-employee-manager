// call function from other file to in file.
const {
  showDepartments,
  addDepartment,
  deleteDepartment,
  viewemployeeBYDepartment,
  viewdepartmentBudget
} = require('./../../lib/departmentGRUD')

// recieve information after user input and apply for condition checking.
departmentGRUD = (choices) => {

  // check condition before calling function.
  if (choices === "View all departments") {
    showDepartments();
  }

  if (choices === "Add a department") {
    addDepartment();
  }

  if (choices === "Delete a department") {
    deleteDepartment();
  }

  if (choices === "View employees by department") {
    viewemployeeBYDepartment();
  }

  if (choices === "View department budgets") {
    viewdepartmentBudget();
  }

};

// export function to use in the other file.
module.exports = departmentGRUD;
const {
  showDepartments,
  addDepartment,
  deleteDepartment,
  viewBudget
} = require('./../../lib/departmentGRUD')

departmentGRUD = (choices) => {

  if (choices === "View all departments") {
    showDepartments();
  }

  if (choices === "Add a department") {
    addDepartment();
  }

  if (choices === "Delete a department") {
    deleteDepartment();
  }

  if (choices === "View department budgets") {
    viewBudget();
  }

};


module.exports = departmentGRUD;
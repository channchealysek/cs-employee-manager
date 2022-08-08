const { showDepartments,
        addDepartment   } = require('./../../lib/dataGRUD')

departmentGRUD = (choices) => {
  if (choices === "View all departments") {
    showDepartments();
  };

  if (choices === "Add a department") {
    addDepartment();
  }
};


module.exports = departmentGRUD;
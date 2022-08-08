const {
    showEmployees,
    addEmployee,
    updateEmployeeRole,
    updateManager,
    employeeBYManager,
    employeeBYDepartment,
    deleteEmployee
} = require('./../../lib/employeeGRUD')

employeeGRUD = (choices) => {

    if (choices === "View all employees") {
        showEmployees();
    }

    if (choices === "Add an employee") {
        addEmployee();
    }

    if (choices === "Update an employee role") {
        updateEmployeeRole();
    }

    if (choices === "Update an employee manager") {
        updateManager();
    }

    if (choices === "View employees by manager") {
        employeeBYManager();
    }

    if (choices === "View employees by department") {
        employeeBYDepartment();
    }

    if (choices === "Delete an employee") {
        deleteEmployee();
    }

};

module.exports = employeeGRUD;
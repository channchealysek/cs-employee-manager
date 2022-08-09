// call function from other file to in file.
const {
    showEmployees,
    addEmployee,
    updateManager,
    deleteEmployee,
    viewemployeeBYManager
} = require('./../../lib/employeeGRUD')

// recieve information after user input and apply for condition checking.
employeeGRUD = (choices) => {

    // check condition before calling function.
    if (choices === "View all employees") {
        showEmployees();
    }

    if (choices === "Add an employee") {
        addEmployee();
    }

    if (choices === "Update an employee manager") {
        updateManager();
    }

    if (choices === "Delete an employee") {
        deleteEmployee();
    }

    if (choices === "View employees by manager") {
        viewemployeeBYManager();
    }

};

// export function to use in the other file.
module.exports = employeeGRUD;
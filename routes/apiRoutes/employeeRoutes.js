const { showEmployees } = require('./../../lib/dataGRUD')

employeeGRUD = (choices) => {
    if (choices === "View all employees") {
        showEmployees();
    }
};

module.exports = employeeGRUD;
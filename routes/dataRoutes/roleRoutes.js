// call function from other file to in file.
const {
    showRoles,
    addRole,
    updateRole,
    deleteRole
} = require('./../../lib/roleGRUD')

// recieve information after user input and apply for condition checking.
roleGRUD = (choices) => {
    // check condition before calling function.
    if (choices === "View all roles") {
        showRoles();
    };

    if (choices === "Add a role") {
        addRole();
    }

    if (choices === "Update an employee role") {
        updateRole();
    }

    if (choices === "Delete a role") {
        deleteRole();
    }
};

// export function to use in the other file.
module.exports = roleGRUD;
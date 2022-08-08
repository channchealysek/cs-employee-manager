const {
    showRoles,
    addRole,
    deleteRole
} = require('./../../lib/roleGRUD')

roleGRUD = (choices) => {

    if (choices === "View all roles") {
        showRoles();
    };

    if (choices === "Add a role") {
        addRole();
    }

    if (choices === "Delete a role") {
        deleteRole();
    }
};

module.exports = roleGRUD;
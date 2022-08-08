const { showRoles, 
        addRole   } = require('./../../lib/dataGRUD')

roleGRUD = (choices) => {
    // function to show all roles 
    if (choices === "View all roles") {
        showRoles();
    };
    if (choices === "Add a role") {
        addRole();
    }
};

module.exports = roleGRUD;
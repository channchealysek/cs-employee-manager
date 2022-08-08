const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./../db/connection');
const userPrompt = require('./../lib/UserPrompts')

showRoles = () => {
    console.log('Showing all roles...\n');
    const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary
             FROM roles
             INNER JOIN departments ON roles.department_id = departments.id
             ORDER BY roles.id ASC`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);

        // return command or exit
        userPrompt();
    })
};

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What role do you want to add?",
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of this role?",
            validate: addSalary => {
                salaryRegex = /^[$]?\d[\d,]*$/
                if (!salaryRegex.test(addSalary)) {
                    return "Not a valid salary!"
                } else {
                    return true;
                }
            }
        }
    ])
        .then(answer => {
            const role = answer.role
            const salary = parseInt(answer.salary.match(/(\d+)/));
            const params = [role, salary];

            // grab dept from department table
            const roleSql = `SELECT name, id FROM departments`;

            db.query(roleSql, (err, data) => {
                if (err) throw err;

                const dept = data.map(({ name, id }) => ({ name: name, value: id }));
                let length = dept.length;
                inquirer.prompt([
                    {
                        type: 'list',
                        pageSize: length,
                        name: 'dept',
                        message: "What department is this role in?",
                        choices: dept
                    }
                ])
                    .then(deptChoice => {
                        const dept = deptChoice.dept;
                        params.push(dept);

                        const sql = `INSERT INTO roles (title, salary, department_id)
                          VALUES (?, ?, ?)`;

                        db.query(sql, params, (err, result) => {
                            if (err) throw err;
                            console.log('Added' + answer.role + " to roles!");

                            showRoles();
                        });
                    });
            });
        });
};

deleteRole = () => {
    const roleSql = `SELECT * FROM roles`;

    db.query(roleSql, (err, data) => {
        if (err) throw err;

        const role = data.map(({ title, id }) => ({ name: title, value: id }));
        let length = role.length;
        inquirer.prompt([
            {
                type: 'list',
                pageSize: length,
                name: 'role',
                message: "What role do you want to delete?",
                choices: role
            }
        ])
            .then(roleChoice => {
                const role = roleChoice.role;
                const sql = `DELETE FROM roles WHERE id = ?`;

                db.query(sql, role, (err, result) => {
                    if (err) throw err;
                    console.log("Successfully deleted!");

                    showRoles();
                });
            });
    });
};

module.exports = {
    showRoles,
    addRole,
    deleteRole
}
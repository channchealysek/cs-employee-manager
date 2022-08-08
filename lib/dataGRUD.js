const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./../db/connection');
const inputCheck = require('./../utils/inputCheck');
const userPrompt = require('./../lib/UserPrompts')

showDepartments = () => {
    console.log('Showing all departments...\n');
    const sql = `SELECT departments.id AS ID, departments.name AS Departments FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);

        // return command or exit
        userPrompt();
    });
};

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: "What department do you want to add?",
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const sql = `INSERT INTO departments (name)
                    VALUES (?)`;
            db.query(sql, answer.addDept, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.addDept + " to departments!");
                showDepartments();
            });
        });
};


showRoles = () => {
    console.log('Showing all roles...\n');
    const sql = `SELECT roles.id, roles.title, departments.name AS department
             FROM roles
             INNER JOIN departments ON roles.department_id = departments.id`;

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

                inquirer.prompt([
                    {
                        type: 'list',
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

showEmployees = () => {
    console.log('Showing all employees...\n');
    const sql = `SELECT employees.id, 
                employees.first_name, 
                employees.last_name, 
                roles.title, 
                departments.name AS department,
                roles.salary, 
                CONCAT (managers.first_name, " ", managers.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees managers ON employees.manager_id = managers.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);

        // return command or exit
        userPrompt();
    });
};

module.exports = {
    showDepartments,
    addDepartment,
    showRoles,
    addRole,
    showEmployees
}
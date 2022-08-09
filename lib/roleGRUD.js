const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./../db/connection');
const userPrompt = require('./../lib/UserPrompts')

// grap view all records from table roles in database.
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

// action perform to add new role to database in table roles
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

// action perform to update empleyee role record.
updateRole = () => {
    // get employees from employee table 
    const employeeSql = `SELECT * FROM employees`;
  
    db.query(employeeSql, (err, data) => {
      if (err) throw err;
  
      const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
      let length = employees.length;
      inquirer.prompt([
        {
          type: 'list',
          pageSize: length,
          name: 'name',
          message: "Which employee would you like to update?",
          choices: employees
        }
      ])
        .then(empChoice => {
          const employee = empChoice.name;
          const params = [];
          params.push(employee);
  
          const roleSql = `SELECT * FROM roles`;
  
          db.query(roleSql, (err, data) => {
            if (err) throw err;
  
            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
            let length = roles.length;
            inquirer.prompt([
              {
                type: 'list',
                pageSize: length,
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
              .then(roleChoice => {
                const role = roleChoice.role;
                params.push(role);
  
                let employee = params[0]
                params[0] = role
                params[1] = employee
  
                // update role for employee by id
                const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
  
                db.query(sql, params, (err, result) => {
                  if (err) throw err;
                  console.log("Employee has been updated!");
  
                  showEmployees();
                });
              });
          });
        });
    });
  };

// action perform to delete record from database in table roles   
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
    updateRole,
    deleteRole
}
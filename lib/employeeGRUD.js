const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./../db/connection');
const userPrompt = require('./../lib/UserPrompts')

// view all records from employees
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

// add new employee record to table
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.fistName, answer.lastName]

      // grab roles from roles table
      const roleSql = `SELECT roles.id, roles.title FROM roles`;

      db.query(roleSql, (err, data) => {
        if (err) throw err;

        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
        let length = roles.length;
        inquirer.prompt([
          {
            type: 'list',
            pageSize: length,
            name: 'role',
            message: "What is the employee's role?",
            choices: roles
          }
        ])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role);

            const managerSql = `SELECT * FROM employees`;
            db.query(managerSql, (err, data) => {
              if (err) throw err;
              let managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
              managers.unshift({ name: "None", value: null });
              let length = managers.length;
              inquirer.prompt([
                {
                  type: 'list',
                  pageSize: length,
                  name: 'manager',
                  message: "Who is the employee's manager?",
                  choices: managers
                }
              ])
                .then(managerChoice => {
                  const manager = managerChoice.manager;

                  params.push(manager);

                  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                      VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!")

                    showEmployees();
                  });
                });
            });
          });
      });
    });
};

// action to perform update employee record.
updateManager = () => {
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
        let id = params[0];

        const managerSql = `SELECT * FROM employees WHERE employees.id NOT IN (${id})`;

        db.query(managerSql, (err, data) => {
          if (err) throw err;

          const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
          let length = managers.length;
          inquirer.prompt([
            {
              type: 'list',
              pageSize: length,
              name: 'manager',
              message: "Who is the employee's manager?",
              choices: managers
            }
          ])
            .then(managerChoice => {
              const manager = managerChoice.manager;
              params.push(manager);

              let employee = params[0]
              params[0] = manager
              params[1] = employee

              // update employee by verify id.
              const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;

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

// action to perform delete employee record from table in database.
deleteEmployee = () => {
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
        message: "Which employee would you like to delete?",
        choices: employees
      }
    ])
      .then(empChoice => {
        const employee = empChoice.name;
        // delete employee from employee table by verify by id
        const sql = `DELETE FROM employees WHERE id = ?`;

        db.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("Successfully Deleted!");

          showEmployees();
        });
      });
  });
};

// grap view employee records by manager
viewemployeeBYManager = () => {
  console.log('\nShowing employee by departments...\n');
  const sql = `SELECT employees.first_name, 
              employees.last_name, 
              CONCAT (managers.first_name, " ", managers.last_name) AS manager
              FROM employees
              LEFT JOIN employees managers ON employees.manager_id = managers.id
              WHERE managers.id IS NOT NULL`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    // return command or exit
    userPrompt();
  });
};

// export function to use in other file.
module.exports = {
  showEmployees,
  addEmployee,
  updateManager,
  deleteEmployee,
  viewemployeeBYManager
}
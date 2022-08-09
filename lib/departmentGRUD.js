const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./../db/connection');
const userPrompt = require('./../lib/UserPrompts')

// grap all records from table departments view to user.
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

// perform action add new record to departments table.
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

// perform delete record from departments table.
deleteDepartment = () => {
  const deptSql = `SELECT * FROM departments`;

  db.query(deptSql, (err, data) => {
    if (err) throw err;

    const dept = data.map(({ name, id }) => ({ name: name, value: id }));
    let length = dept.length;
    inquirer.prompt([
      {
        type: 'list',
        pageSize: length,
        name: 'dept',
        message: "What department do you want to delete?",
        choices: dept
      }
    ])
      .then(deptChoice => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM departments WHERE id = ?`;

        db.query(sql, dept, (err, result) => {
          if (err) throw err;
          console.log("Successfully deleted!");

          showDepartments();
        });
      });
  });
}

// get view employees by departments
viewemployeeBYDepartment = () => {
  console.log('\nShowing employee by departments...\n');
  const sql = `SELECT employees.first_name, 
              employees.last_name, 
              departments.name AS department
              FROM employees 
              LEFT JOIN roles ON employees.role_id = roles.id 
              LEFT JOIN departments ON roles.department_id = departments.id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    // return command or exit
    userPrompt();
  });
};

// get to view total salary by department name.
viewdepartmentBudget = () => {
  console.log('Showing budget by department...\n');

  const sql = `SELECT department_id AS id, 
                      departments.name AS department,
                      SUM(salary) AS budget
               FROM  roles  
               JOIN departments ON roles.department_id = departments.id
               GROUP BY  department_id
               ORDER BY department_id`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

    // return command or exit
    userPrompt();
  });
};

// export function to use in other file.
module.exports = {
  showDepartments,
  addDepartment,
  deleteDepartment,
  viewemployeeBYDepartment,
  viewdepartmentBudget
}
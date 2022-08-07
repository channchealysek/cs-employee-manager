const express = require('express');
const cTable = require('console.table'); 
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const getInputTask  = require('../../lib/UserInputTask')

// function to show all departments 
showDepartments = () => {
    console.log('Showing all departments...\n');
    const sql = `SELECT departments.id AS ID, departments.name AS Departments FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
    });

  };

  // function to show all roles 
showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT roles.id, roles.title, departments.name AS department
               FROM roles
               INNER JOIN departments ON roles.department_id = departments.id`;
  
  db.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows); 
  })
};

// function to show all employees 
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
                      LEFT JOIN roles ON employee.role_id = roles.id
                      LEFT JOIN departments ON roles.department_id = departments.id
                      LEFT JOIN employees managers ON employees.manager_id = managers.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
  });
};

// module.exports = {
//   showDepartments,
//   showRoles,
//   showEmployees
// };

module.exports = showDepartments;
module.exports = showRoles;
module.exports = showEmployees;
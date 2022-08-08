INSERT INTO departments (name)
VALUES 
('Engineering'),
('Finance & Accounting'),
('Legal'),
('Sales & Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1), 
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2), 
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Jonh', 'Laweyer', 2, null),
('Meezy', 'Aely', 1, 1),
('Lee', 'ToylerK', 4, null),
('Fyty', 'HameGe', 3, 3),
('Hyee', 'NoyKie', 2, null);
USE employee_db

INSERT INTO departments (department_name)
VALUES
    ("SecOps"),
    ("Development"),
    ("People Development");

INSERT INTO employees (first_name, last_name, manager, role_id)
VALUES
    ("John", "Smith", "Jenny", 3),
    ("Richard", "Simmons", "Jackson", 2),
    ("Alfred", "Pennyworth", "Bruce", 1);

INSERT INTO roles (job_title, department_id, salary)
VALUES
    ("Developer", 1, 100000),
    ("HR Rep", 2, 85000),
    ("Security Operator", 3, 75000);
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock database
let employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager' },
    { id: 3, name: 'Sam Johnson', position: 'Designer' },
];

// Function to get all employees
const getEmployees = () => employees;

// Function to get employee by ID
const getEmployeeById = (id) => employees.find(emp => emp.id === id);

// Function to add a new employee
const addEmployee = (employee) => {
    employees.push(employee);
    return employee;
};

// Route to get all employees
app.get('/employees', (req, res) => {
    res.json(getEmployees());
});

// Route to get employee by ID
app.get('/employees/details/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const employee = getEmployeeById(id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

// Route to add a new employee
app.post('/employees/new', (req, res) => {
    const newEmployee = req.body;
    const addedEmployee = addEmployee(newEmployee);
    res.status(201).json(addedEmployee);
});

module.exports = { app, getEmployees, getEmployeeById, addEmployee };

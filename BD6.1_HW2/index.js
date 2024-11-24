const { getEmployees, getEmployeeById, addEmployee } = require("./employee.js");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to get all employees
app.get("/employees", (req, res) => {
    res.json(getEmployees());
});

// Endpoint to get employee by ID
app.get("/employees/:id", (req, res) => {
    const employee = getEmployeeById(parseInt(req.params.id));
    if (!employee) return res.status(404).send("Employee not found");
    res.json(employee);
});

// Endpoint to add a new employee
app.post("/employees", (req, res) => {
    const newEmployee = req.body;
    const employee = addEmployee(newEmployee);
    res.status(201).json(employee);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

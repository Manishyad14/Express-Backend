import express from "express";
import { sequelize } from "./lib/index.js";
import { Employee } from "./models/employee.model.js";

const app = express();
app.use(express.json());

const employeesData = [
  {
    id: 1,
    name: "Alice",
    salary: 60000,
    department: "Engineering",
    designation: "Software Engineer",
  },
  {
    id: 2,
    name: "Bob",
    salary: 70000,
    department: "Marketing",
    designation: "Marketing Manager",
  },
  {
    id: 3,
    name: "Charlie",
    salary: 80000,
    department: "Engineering",
    designation: "Senior Software Engineer",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(employeesData);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all employees
async function fetchAllEmployees() {
  const employees = await Employee.findAll();
  return { employees };
}

app.get("/employees", async (req, res) => {
  try {
    const response = await fetchAllEmployees();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch employee details by ID
async function fetchEmployeeById(id) {
  const employee = await Employee.findByPk(id);
  return { employee };
}

app.get("/employees/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetchEmployeeById(id);
    if (!response.employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all employees by department
async function fetchEmployeesByDepartment(department) {
  const employees = await Employee.findAll({ where: { department } });
  return { employees };
}

app.get("/employees/department/:department", async (req, res) => {
  const department = req.params.department;
  try {
    const response = await fetchEmployeesByDepartment(department);
    if (response.employees.length === 0) {
      return res
        .status(404)
        .json({ message: "No employees found in the given department" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the employees by salary
async function sortEmployeesBySalary(order) {
  const employees = await Employee.findAll({ order: [["salary", order]] });
  return { employees };
}

app.get("/employees/sort/salary", async (req, res) => {
  const order = req.query.order === "desc" ? "DESC" : "ASC";
  try {
    const response = await sortEmployeesBySalary(order);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

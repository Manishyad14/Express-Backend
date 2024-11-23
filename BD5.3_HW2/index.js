import express from "express";
import { Employee } from "./models/employee.model.js";
import { sequelize } from "./lib/index.js";

const app = express();

const employees = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 2,
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    id: 3,
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    id: 5,
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    id: 7,
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    id: 8,
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    id: 9,
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    id: 10,
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(employees);

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 1: Fetch All Employees

async function fetchAllEmployees() {
  let employees = await Employee.findAll();
  return { employees };
}

app.get("/employees", async (req, res) => {
  try {
    let response = await fetchAllEmployees();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Add a New Employee

async function addNewEmployee(newEmployeeData) {
  let employeeRecord = await Employee.create(newEmployeeData);
  return { newEmployee: employeeRecord };
}

app.post("/employees/new", async (req, res) => {
  try {
    let newEmployee = req.body.newEmployee;

    let response = await addNewEmployee(newEmployee);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Update Employee Information

async function updateEmployeeById(newEmployeeData, id) {
  let employeeDetails = await Employee.findOne({ where: { id } });
  if (!employeeDetails) {
    return;
  }

  employeeDetails.set(newEmployeeData);
  let updatedEmployee = await employeeDetails.save();
  return { message: "Employee updated successfully", updatedEmployee };
}

app.post("/employees/update/:id", async (req, res) => {
  try {
    let newEmployeeData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateEmployeeById(newEmployeeData, id);
    if (!response) {
      return res.status(404).json({ message: "Employee not found." });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 4: Delete an Employee

async function deleteEmployeeById(id) {
  let destroyedEmployee = await Employee.destroy({ where: { id } });

  if (destroyedEmployee === 0) return;
  return { message: "Employee record deleted successfully" };
}

app.post("/employees/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);

    let response = await deleteEmployeeById(id);
    if (!response) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import express from "express";
import { employee } from "./models/employee.model.js";
import { sequelize } from "./lib/index.js";

const app = express();

const employees = [
  { name: "John Doe", department: "Engineering", salary: 70000, designation: "Software Engineer" },
  { name: "Jane Smith", department: "Marketing", salary: 60000, designation: "Marketing Manager" },
  { name: "Alice Johnson", department: "HR", salary: 50000, designation: "HR Specialist" },
  { name: "Bob Brown", department: "Finance", salary: 80000, designation: "Finance Analyst" },
  { name: "Charlie White", department: "Engineering", salary: 90000, designation: "DevOps Engineer" },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates the table
    await employee.bulkCreate(employees);

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

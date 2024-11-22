import express from "express";
import { sequelize } from "./lib/index.js";
import { Company } from "./models/company.model.js";

const app = express();
app.use(express.json());

const companiesData = [
  {
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
  {
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];


sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Database synchronized.");
    await Company.bulkCreate(companiesData);
    console.log("Data seeded successfully.");
  })
  .catch((err) => console.error("Error initializing database:", err));



// Exercise 1: Fetch all companies
app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch company details by ID
app.get("/companies/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const company = await Company.findByPk(id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch companies by industry
app.get("/companies/industry/:industry", async (req, res) => {
  const { industry } = req.params;
  try {
    const companies = await Company.findAll({ where: { industry } });
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort companies by revenue
app.get("/companies/revenue", async (req, res) => {
  const { order = "asc" } = req.query;
  try {
    const companies = await Company.findAll({ order: [["revenue", order]] });
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

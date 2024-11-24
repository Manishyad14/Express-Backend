import express from "express";
import { company } from "./models/company.model.js";
import { sequelize } from "./lib/index.js";

const app = express();

const Companys = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    id: 3,
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
  {
    id: 6,
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    id: 7,
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    id: 8,
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await company.bulkCreate(Companys);

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 1: Fetch All Companies

async function fetchAllCompanies() {
  let companies = await company.findAll();
  return { companies };
}

app.get("/companies", async (req, res) => {
  try {
    let response = await fetchAllCompanies();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Add a New Company ouyfuiyf
async function addNewCompany(newCompanyData) {
  let companyRecord = await Company.create(newCompanyData);
  return { newCompany: companyRecord };
}

app.post("/companies/new", async (req, res) => {
  try {
    let newCompany = req.body.newCompany;

    let response = await addNewCompany(newCompany);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Update Company Information

async function updateCompanyById(newCompanyData, id) {
  let companyDetails = await Company.findOne({ where: { id } });
  if (!companyDetails) {
    return;
  }

  companyDetails.set(newCompanyData);
  let updatedCompany = await companyDetails.save();
  return { message: "Company updated successfully", updatedCompany };
}

app.post("/companies/update/:id", async (req, res) => {
  try {
    let newCompanyData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateCompanyById(newCompanyData, id);
    if (!response) {
      return res.status(404).json({ message: "Company not found." });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Exercise 4: Delete a Company
async function deleteCompanyById(id) {
  let destroyedCompany = await Company.destroy({ where: { id } });

  if (destroyedCompany === 0) return;
  return { message: "Company record deleted successfully" };
}

app.post("/companies/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);

    let response = await deleteCompanyById(id);
    if (!response) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

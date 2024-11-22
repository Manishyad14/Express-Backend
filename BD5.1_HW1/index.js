import express from "express";
import { post } from "./models/post.model.js";
import { sequelize } from "./lib/index.js";

const app = express();

const posts = [
  {
    name: "Erling Haaland",
    position: "Forward",
    nationality: "Norwegian",
    age: 23,
    jerseyNumber: 9,
  },
  {
    name: "Kevin De Bruyne",
    position: "Midfielder",
    nationality: "Belgian",
    age: 32,
    jerseyNumber: 17,
  },
  {
    name: "Phil Foden",
    position: "Midfielder",
    nationality: "English",
    age: 24,
    jerseyNumber: 47,
  },
  {
    name: "Bernardo Silva",
    position: "Midfielder",
    nationality: "Portuguese",
    age: 29,
    jerseyNumber: 20,
  },
  {
    name: "Jack Grealish",
    position: "Forward",
    nationality: "English",
    age: 28,
    jerseyNumber: 10,
  },
  {
    name: "Rúben Dias",
    position: "Defender",
    nationality: "Portuguese",
    age: 26,
    jerseyNumber: 3,
  },
  {
    name: "Kyle Walker",
    position: "Defender",
    nationality: "English",
    age: 34,
    jerseyNumber: 2,
  },
  {
    name: "Rodri",
    position: "Midfielder",
    nationality: "Spanish",
    age: 27,
    jerseyNumber: 16,
  },
  {
    name: "Ederson Moraes",
    position: "Goalkeeper",
    nationality: "Brazilian",
    age: 30,
    jerseyNumber: 31,
  },
  {
    name: "João Cancelo",
    position: "Defender",
    nationality: "Portuguese",
    age: 29,
    jerseyNumber: 7,
  },
  {
    name: "Ilkay Gündogan",
    position: "Midfielder",
    nationality: "German",
    age: 33,
    jerseyNumber: 8,
  },
  {
    name: "Nathan Aké",
    position: "Defender",
    nationality: "Dutch",
    age: 28,
    jerseyNumber: 6,
  },
  {
    name: "Aymeric Laporte",
    position: "Defender",
    nationality: "Spanish",
    age: 30,
    jerseyNumber: 14,
  },
  {
    name: "Riyad Mahrez",
    position: "Forward",
    nationality: "Algerian",
    age: 33,
    jerseyNumber: 26,
  },
  {
    name: "Manuel Akanji",
    position: "Defender",
    nationality: "Swiss",
    age: 27,
    jerseyNumber: 25,
  },
  {
    name: "Kalvin Phillips",
    position: "Midfielder",
    nationality: "English",
    age: 28,
    jerseyNumber: 4,
  },
  {
    name: "Sergio Gómez",
    position: "Defender",
    nationality: "Spanish",
    age: 23,
    jerseyNumber: 21,
  },
  {
    name: "Rico Lewis",
    position: "Defender",
    nationality: "English",
    age: 20,
    jerseyNumber: 82,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // Recreate tables
    await post.bulkCreate(posts); // Seed dummy data

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

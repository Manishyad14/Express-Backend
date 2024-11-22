import express from "express";
import { book } from "./models/book.model.js";
import { sequelize } from "./lib/index.js";

const app = express();

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the American Dream in the Jazz Age.",
    genre: "Classic",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial injustice in the deep South.",
    genre: "Fiction",
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel about totalitarianism and surveillance.",
    genre: "Dystopian",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    description: "A tale of obsession and revenge on the high seas.",
    genre: "Adventure",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "A romantic novel that deals with issues of marriage and class.",
    genre: "Romance",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true }); // Drops and recreates the table
    await book.bulkCreate(books);

    res.status(200).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

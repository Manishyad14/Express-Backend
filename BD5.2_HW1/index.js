import express from "express";
import { sequelize } from "./lib/index.js";
import { Post } from "./models/post.model.js";

const app = express();
app.use(express.json());

const postsData = [
  {
    id: 1,
    name: "Post1",
    author: "Author1",
    content: "This is the content of post 1",
    title: "Title1",
  },
  {
    id: 2,
    name: "Post2",
    author: "Author2",
    content: "This is the content of post 2",
    title: "Title2",
  },
  {
    id: 3,
    name: "Post3",
    author: "Author1",
    content: "This is the content of post 3",
    title: "Title3",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Post.bulkCreate(postsData);
    res.status(200).json({ message: "Database seeding successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all posts
async function fetchAllPosts() {
  const posts = await Post.findAll({ attributes: ["id", "name", "content"] });
  return { posts };
}

app.get("/posts", async (req, res) => {
  try {
    const response = await fetchAllPosts();
    if (response.posts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch post details by ID
async function fetchPostById(id) {
  const post = await Post.findByPk(id);
  return { post };
}

app.get("/posts/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetchPostById(id);
    if (!response.post) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all posts by an author
async function fetchPostsByAuthor(author) {
  const posts = await Post.findAll({ where: { author } });
  return { posts };
}

app.get("/posts/author/:author", async (req, res) => {
  const author = req.params.author;
  try {
    const response = await fetchPostsByAuthor(author);
    if (response.posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for the given author." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the posts by name
async function sortPostsByName(order) {
  const posts = await Post.findAll({ order: [["name", order]] });
  return { posts };
}

app.get("/posts/sort/name", async (req, res) => {
  const order = req.query.order === "desc" ? "DESC" : "ASC";
  try {
    const response = await sortPostsByName(order);
    if (response.posts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

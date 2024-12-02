const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

let reviewIdCounter = 3;
let userIdCounter = 3;

// Exercise 1: Get All Reviews
app.get("/reviews", (req, res) => {
  res.json(reviews);
});

// Exercise 2: Get Review by ID
app.get("/reviews/details/:id", (req, res) => {
  const review = reviews.find((r) => r.id === parseInt(req.params.id));
  if (!review) return res.status(404).send("Review not found");
  res.json(review);
});

// Exercise 3: Add a New Review
app.post("/reviews/new", (req, res) => {
  const { content, userId } = req.body;
  if (!content || !userId) return res.status(400).send("Missing fields");
  const newReview = { id: reviewIdCounter++, content, userId };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Exercise 4: Get User by ID
app.get("/users/details/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// Exercise 5: Add a New User
app.post("/users/new", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send("Missing fields");
  const newUser = { id: userIdCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = {
  app,
  getAllReviews: () => Promise.resolve(reviews),
  getReviewById: (id) => Promise.resolve(reviews.find((r) => r.id === id) || null),
  addReview: (newReview) => {
    reviews.push(newReview);
    return Promise.resolve(newReview);
  },
  getUserById: (id) => Promise.resolve(users.find((u) => u.id === id) || null),
  addUser: (newUser) => {
    users.push(newUser);
    return Promise.resolve(newUser);
  },
};

if (require.main === module) {
  app.listen(3000, () => console.log("Server is running on port 3000"));
}

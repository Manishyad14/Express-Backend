import express from "express";
import { track } from "./models/track.model.js"; // Ensure `track.model.js` exports the `track` model correctly
import { sequelize } from "./lib/index.js"; // Ensure Sequelize is initialized in `index.js`

const app = express();

const movieData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(movieData);

    res.status(200).json({ message: "Database seeding successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Fetch all tracks
async function fetchAllTracks() {
  return await track.findAll();
}

app.get("/tracks", async (req, res) => {
  try {
    let tracks = await fetchAllTracks();
    if (!tracks.length) {
      return res.status(404).json({ message: "No tracks found." });
    }
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch track details by ID
async function fetchTrackById(id) {
  return await track.findByPk(id);
}

app.get("/tracks/details/:id", async (req, res) => {
  try {
    let track = await fetchTrackById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: "Track not found." });
    }
    res.status(200).json({ track });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all tracks by an artist
async function fetchTracksByArtist(artist) {
  return await track.findAll({ where: { artist } });
}

app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let tracks = await fetchTracksByArtist(req.params.artist);
    if (!tracks.length) {
      return res
        .status(404)
        .json({ message: "No tracks found for the given artist." });
    }
    res.status(200).json({ tracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all tracks by release year
async function sortTrackByReleaseYear(order) {
  let sortedTracks = await track.findAll({
    where: [["release_year", order]],
  });
  return { tracks: sortedTracks };
}

app.get("/tracks/sort/release_year", async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortTrackByReleaseYear(order);

    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

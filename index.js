const express = require("express");
const app = express();

app.use(express.json());

const genres = {
  1: "Action",
  2: "Comedy",
  3: "Drama",
};
// routes put
app.put("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = {
    id: id,
    name: req.body.name,
  };
  genres[id] = genre;
  res.json(genre);
});

// routes post
app.post("/api/genres", (req, res) => {
  // check if genre already exists
  if (genres[req.body.name]) {
    return res.status(400).send("Genre already exists");
  }
  // validate genre use joi
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres[genre.id] = genre;
  res.json(genre);
});

// routes get

app.get("/", (req, res) => {
  res.send("Vidle");
});
// get all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});
// get genres by id
app.get("/api/genres/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.send(genres[id]);
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

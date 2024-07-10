const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! ");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

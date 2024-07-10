const express = require("express");
const app = express();
app.get("/", (reg, res) => {
  res.send("hello world");
});
app.get("/api/courses", (reg, res) => {
  res.send([1, 2, 3]);
});

const port = 3000;
app.listen(port, () => console.log(`server running on port ${port}`));

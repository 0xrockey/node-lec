const express = require("express");
const app = express();
app.get("/", (reg, res) => {
  res.send("Hello World");
});
app.get("/api/courses", (reg, res) => {
  res.send([1, 2, 3]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));

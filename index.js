const express = require("express");
const log = require("./logger");

const Joi = require("joi");
const app = express();
app.use(log);

// simple medill ware
app.use(express.json());

// custom medill ware
app.use(function (req, res, next) {
  console.log("Authentiction...");
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (reg, res) => {
  res.send("Hello World");
});

// handling get
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
// handling post
app.post("/api/courses", (req, res) => {
  // validation with express
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// handling put
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existaing  ,return 404 -resources not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The courses was not found");
  // Validate
  // if invalide ,return 400 -bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update courses , and return the  updated  courses
  course.name = req.body.name;
  res.send(course);
});
// validate course
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.valid(course, schema);
}

// handling delete
app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existaing  ,return 404 -resources not found
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The courses was not found");

  //Delete
  const index = courses.indexOf(course);
  courses.splice(course, 1);
  //Return  the same courses
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The courses  was not found");
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port ${port}`));

const express = require("express");
const router = express.Router();
const students = require("../data/students");

// GET all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET student by ID
router.get("/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// POST new student
router.post("/", (req, res) => {
  const newStudent = req.body;

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT update student
router.put("/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;
  student.age = req.body.age;
  student.course = req.body.course;

  res.json(student);
});

// DELETE student
router.delete("/:id", (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.json({ message: "Student deleted" });
});

module.exports = router;
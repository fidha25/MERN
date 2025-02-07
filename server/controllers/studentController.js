const Student = require('../models/studentModel');

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { name, age } = req.body;
    const student = new Student({ name, age });
    await student.save();
    res.status(201).json({ message: 'Student added', student });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

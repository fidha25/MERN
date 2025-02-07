const { Create, getAllStudents, deleteStudent, updateStudent, getStudentById } = require('../controllers/studentController.js');


const express = require('express')

const route=express.Router();

route.post('/student',Create)
route.get('/students',getAllStudents)
route.delete('/delete/student/:id',deleteStudent)
route.put('/update/student/:id',updateStudent)
route.get('/student/:id',getStudentById)


module.exports= route;

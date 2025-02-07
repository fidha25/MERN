
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentForm.css';

export default function StudentForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch students when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', { name, age });
      alert('Student added successfully');
      fetchStudents(); // Refresh student list
      setName('');
      setAge('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove authentication token
    navigate('/register'); // Redirect to registration page
  };

  return (
    <div className="student-container">
      <div className="header">
        <h2>Student Management</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter student age"
          required
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <h3>Student List</h3>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student._id} className="student-item">
            {student.name} - {student.age} years
          </li>
        ))}
      </ul>
    </div>
  );
}

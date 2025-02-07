import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login'; 
import Registration from './Components/Login/Registration';
import StudentForm from './Components/StudentForm/StudentForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/students" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;

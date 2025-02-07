
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Registration from './Components/Login/Registration';
import AddStudent from './Components/Student/AddStudent';
import Display from './Components/Student/Display';
import UpdateStudent from './Components/Student/UpdateStudent';
import PrivateRoute from './Components/ProtectedRoutes/PrivateRoute'; // Import PrivateRoute
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes */}
        <Route path="/add" element={<PrivateRoute element={<AddStudent />} />} />
        <Route path="/display" element={<PrivateRoute element={<Display />} />} />
        <Route path="/update/:id" element={<PrivateRoute element={<UpdateStudent />} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

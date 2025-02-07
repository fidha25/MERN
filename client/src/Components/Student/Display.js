import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';

export default function Display() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/delete/student/${userId}`)
      .then((response) => {
        setStudents((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log("Error while deleting data", error);
      });
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    toast.success('Logged out successfully!', { position: 'top-right' });
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="table-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center mb-4">Student Details</h1>
        <Button variant="danger" onClick={handleLogout}>Logout</Button> {/* Logout Button */}
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th> {/* Added actions column */}
          </tr>
        </thead>
        <tbody>
          {students.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <Button variant='danger' onClick={() => deleteUser(user._id)}>Delete</Button>{' '}
                  <Button variant='primary'>
                    <Link to={'/update/' + user._id} style={{ color: "white", textDecoration: "none" }}>Update</Link>
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Button type="button" variant="warning">
        <Link to="/add" style={{ color: "black", textDecoration: "none" }}>Back</Link>
      </Button>
    </div>
  );
}

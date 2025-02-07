import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Student.css'; // Import the CSS file

export default function UpdateStudent() {
    const students = {
        name: "",
        email: "",
        address: "",
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(students);

    const inputHandler = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/student/${id}`)
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios
            .put(`http://localhost:5000/api/update/student/${id}`, student)
            .then((response) => {
                console.log(response.data); // Log the response
                toast.success(response.data.message, { position: "top-right" });
                navigate('/display');
            })
            .catch((error) => {
                console.log(error); // Log error details
            });
    };

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        toast.success('Logged out successfully!', { position: 'top-right' });
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="form-container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center mb-4">Update Student</h1>
                <Button variant="danger" onClick={handleLogout}>Logout</Button> {/* Logout Button */}
            </div>

            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={student.name}
                        onChange={inputHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={student.email}
                        onChange={inputHandler}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={student.address}
                        onChange={inputHandler}
                    />
                </Form.Group>
                <Button variant="warning" type="submit">Update</Button>{' '}
                <Button variant="warning">
                    <Link to="/display" style={{ textDecoration: 'none', color: 'inherit' }}>View Users</Link>
                </Button>
            </Form>
        </div>
    );
}

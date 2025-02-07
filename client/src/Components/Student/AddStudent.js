import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Student.css';

function AddStudent() {
    const students = {
        name: "",
        email: "",
        address: "",
    };

    const [student, setStudent] = useState(students);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:5000/api/student", student)
            .then((response) => {
                console.log(response.data);
                toast.success(response.data.message, { position: "top-right" });
                navigate('/display');
            })
            .catch((error) => {
                if (error.response && error.response.data.message) {
                    toast.error(error.response.data.message, { position: 'top-right' });
                } else {
                    toast.error('Something went wrong. Please try again.', { position: 'top-right' });
                }
                console.log(error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        toast.success('Logged out successfully!', { position: "top-right" });
        navigate('/'); // Redirect to login
    };

    return (
        <div className="form-container">
            {/* ✅ Logout Button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="text-center">Add Student</h1>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>

            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" onChange={inputHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name="email" onChange={inputHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} name="address" onChange={inputHandler} />
                </Form.Group>
                <Button variant="warning" type="submit">Submit</Button>
                <Button variant="warning" type="button" className="ms-2">
                    <Link to="/display" style={{ textDecoration: 'none', color: 'inherit' }}>View Users</Link>
                </Button>
            </Form>
        </div>
    );
}

export default AddStudent;

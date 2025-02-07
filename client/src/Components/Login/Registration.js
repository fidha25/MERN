import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password,
        confirmPassword,
      });

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      navigate('/');
      // Redirect or show success message
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="form-group" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="form-group" controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="form-group" controlId="formPlaintextConfirmPassword">
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm your password"
              />
            </Col>
          </Form.Group>

          <button className="btn-submit" type="submit">
            Register
          </button>
          <p className="switch-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
        </Form>
      </div>
    </div>
  );
}
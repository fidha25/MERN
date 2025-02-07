// import React, { useState } from 'react';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import axios from 'axios';
// import './Login.css';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/login', {
//         email,
//         password,
//       });

//       console.log('Login successful:', response.data);
//       alert('Login successful!');
//       // Save the token to localStorage or context and redirect
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Login failed:', error.response?.data?.message || error.message);
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login</h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group as={Row} className="form-group" controlId="formPlaintextEmail">
//             <Form.Label column sm="2">
//               Email
//             </Form.Label>
//             <Col sm="10">
//               <Form.Control
//                 type="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 placeholder="Enter your email"
//               />
//             </Col>
//           </Form.Group>

//           <Form.Group as={Row} className="form-group" controlId="formPlaintextPassword">
//             <Form.Label column sm="2">
//               Password
//             </Form.Label>
//             <Col sm="10">
//               <Form.Control
//                 type="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 placeholder="Enter your password"
//               />
//             </Col>
//           </Form.Group>

//           <button className="btn-submit" type="submit">
//             Login
//           </button>
//         </Form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      alert('Login successful!');
      
      localStorage.setItem('token', response.data.token);

      navigate('/students'); 
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="form-group" controlId="formPlaintextEmail">
            <Form.Label column sm="2">Email</Form.Label>
            <Col sm="10">
              <Form.Control type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="form-group" controlId="formPlaintextPassword">
            <Form.Label column sm="2">Password</Form.Label>
            <Col sm="10">
              <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
            </Col>
          </Form.Group>

          <button className="btn-submit" type="submit">Login</button>
        </Form>

        <p className="switch-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../Css/Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response;

      // Attempt login as customer first
      try {
        response = await axios.post('https://localhost:7081/api/Customer/Login', { email, password });
        if (response.status === 200) {
          const userData = response.data;
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/main'); // Redirect customers to the main page
          return; // Exit function after successful login
        }
      } catch (err) {}

      // If customer login fails, try admin login
      try {
        response = await axios.post('https://localhost:7081/api/Admin/Login', { email, password });
        if (response.status === 200) {
          const userData = response.data;
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/admin'); // Redirect admins to the admin dashboard
          return; // Exit function after successful login
        }
      } catch (err) {}

      // If admin login fails, try staff login
      try {
        response = await axios.post('https://localhost:7081/api/Staff/Login', { email, password });
        if (response.status === 200) {
          const userData = response.data;
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/staff'); // Redirect staff to the staff dashboard
          return; // Exit function after successful login
        }
      } catch (err) {}

      // If all login attempts fail
      setError('Invalid email or password');
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">ABC Restaurant</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/reservation">Reservation</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/gallery">Gallery</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

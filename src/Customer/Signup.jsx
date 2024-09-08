import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    id: 0, // Defaulting the id to 0 as per the curl command
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('danger');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7081/api/Customer/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlertMessage('Registration successful!');
        setAlertVariant('success');
        setTimeout(() => {
          navigate('/login'); // Navigate to login page after successful registration
        }, 2000);
      } else {
        setAlertMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering customer:', error);
      setAlertMessage('An error occurred. Please try again later.');
    }
    setShowAlert(true);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">ABC Restaurant Register</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="signup-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center">Sign Up</h2>
            {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
              <Button variant="secondary" onClick={handleBack} className="w-100 mt-3">
                Back
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;

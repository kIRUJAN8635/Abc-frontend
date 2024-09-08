import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Facility.css';
import { Navbar, Nav, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('https://localhost:7081/api/Facility/CustomerView');
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities:', error);
        alert('Failed to load facilities. Please try again later.');
      }
    };

    fetchFacilities();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://localhost:7081/api/Facility/SearchByName/${searchTerm}`);
      setFacilities(response.data);
    } catch (error) {
      console.error('Error searching facilities:', error);
      alert('Failed to search facilities. Please try again later.');
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
      
      {/* Search Bar */}
      <Container className="my-4">
        <Form onSubmit={handleSearch}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Control
                type="text"
                placeholder="Search facilities by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md="auto">
              <Button type="submit" variant="primary">Search</Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Facilities List */}
      <Container className="facility-container">
        <Row>
          {facilities.map((facility) => (
            <Col key={facility.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={facility.imageUrl} alt={facility.name} />
                <Card.Body>
                  <Card.Title>{facility.name}</Card.Title>
                  <Card.Text>{facility.description}</Card.Text>
                  <Card.Text><strong>Status:</strong> {facility.status}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Facility;

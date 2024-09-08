import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Home.css';

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/Offer/CustomerView');
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the username from localStorage
    setUsername(null);
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Row className="w-100">
            <Col xs={4}>
              <Navbar.Brand as={Link} to="/" className="d-flex justify-content-start">
                ABC Restaurant
              </Navbar.Brand>
            </Col>
            <Col xs={7}>
              <Nav className="d-flex justify-content-center">
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                <Nav.Link as={Link} to="/reservation">Reservation</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                <Nav.Link as={Link} to="/query">AddQuery</Nav.Link>
                <Nav.Link as={Link} to="/facility">Facility</Nav.Link>
                <Nav.Link as={Link} to="/review">Review</Nav.Link>
                <Nav.Link as={Link} to="/">Logout</Nav.Link>
              </Nav>
            </Col>
            <Col xs={4}>
              <Nav className="d-flex justify-content-end">
                {username ? (
                  <>
                    <Nav.Link>Welcome back, {username}</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                   
                   
                  </>
                )}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>

      {/* Main Offer Gallery */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Exclusive Offers</h2>
        <Row>
          {offers.length > 0 ? (
            offers.map((offer) => (
              <Col md={4} className="mb-4" key={offer.id}>
                <Card>
                  <Card.Img variant="top" src={offer.url} alt={offer.name} />
                  <Card.Body>
                    <Card.Title>{offer.name}</Card.Title>
                    <Card.Text>{offer.description}</Card.Text>
                    <Card.Text><strong>Discount: </strong>{offer.discount}</Card.Text>
                    <Button variant="primary">Order Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No offers available at the moment.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;

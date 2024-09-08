import React from 'react';

import '../Css/About.css';
import { Navbar, Nav, Container,Image, Row, Col } from 'react-bootstrap';


const About = () => {
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
    <Container className="about-section">
      <Row>
        <Col md={6} className="about-text">
          <h2>About ABC Restaurant</h2>
          <p>
            Welcome to ABC Restaurant, where we bring you a delightful culinary experience with a blend of traditional and modern cuisine. Our restaurant is known for its cozy ambiance, excellent service, and a menu that offers a wide variety of dishes to suit every palate.
          </p>
          <p>
            Established in 2024, ABC Restaurant has quickly become a favorite dining spot for locals and visitors alike. We pride ourselves on using the freshest ingredients to prepare mouth-watering dishes that not only satisfy your hunger but also provide a memorable dining experience.
          </p>
          <p>
            Whether you're here for a family dinner, a romantic date, or a business lunch, our friendly staff is committed to making your visit special. Come and enjoy the finest food, a warm atmosphere, and exceptional service at ABC Restaurant.
          </p>
        </Col>
        <Col md={6} className="about-image">
          <Image src="https://keprtv.com/resources/media2/16x9/full/1015/center/80/80ff0605-9e9e-42b8-b51a-86a176aee433-large16x9_thumb_24181.png" alt="ABC Restaurant" fluid />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default About;

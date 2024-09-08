import React, { useState, useEffect } from 'react';
import '../Css/Gallery.css';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/Gallery/CustomerView', {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
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
    <div className="gallery-container">
      <h1>ABC RESTURTANT GALLERY</h1>
      <div className="gallery-grid">
        {galleryItems.length > 0 ? (
          galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.imageUrl} alt={item.description} className="gallery-image" />
              <div className="gallery-description">{item.description}</div>
            </div>
          ))
        ) : (
          <p>No gallery items available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Gallery;

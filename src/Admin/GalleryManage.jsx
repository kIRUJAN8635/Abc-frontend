import React, { useState, useEffect } from 'react';
import '../Css/GalleryManage.css';
import { Navbar, Nav, Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GalleryManage = () => {
  const [galleryItem, setGalleryItem] = useState({
    imageUrl: '',
    description: '',
    resturantId: 0,
    resturant: {
      id: 0,
      name: '',
      location: '',
      phone: '',
      overview: '',
      email: ''
    }
  });

  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/Gallery/CustomerView');
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGalleryItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7081/api/Gallery/AdminAdd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(galleryItem),
      });
      if (response.ok) {
        alert('Image added successfully!');
        setGalleryItem({
          imageUrl: '',
          description: '',
          resturantId: 0,
          resturant: {
            id: 0,
            name: '',
            location: '',
            phone: '',
            overview: '',
            email: ''
          }
        });
        fetchGalleryItems(); // Refresh the gallery items list
      } else {
        alert('Failed to add image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7081/api/Gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
        },
      });
      if (response.ok) {
        alert('Image deleted successfully!');
        fetchGalleryItems(); // Refresh the gallery items list
      } else {
        alert('Failed to delete image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">ABC Restaurant Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/admin/reservations">Reservations</Nav.Link>
              <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
              <Nav.Link as={Link} to="/admin/queries">Queries</Nav.Link>
              <Nav.Link as={Link} to="/admin/menu">Menu</Nav.Link>
              <Nav.Link as={Link} to="/admin/offers">Offers</Nav.Link>
              <Nav.Link as={Link} to="/facilitymanage">Facility</Nav.Link>
              <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="gallery-manage-content">
        {/* Layout Container */}
        <div className="gallery-manage-container">
          {/* Add New Gallery Image Form */}
          <div className="gallery-form-container">
            <h2>Add New Gallery Image</h2>
            <form onSubmit={handleSubmit} className="gallery-form">
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={galleryItem.imageUrl}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={galleryItem.description}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="text"
                name="resturantId"
                placeholder="Restaurant ID"
                value={galleryItem.resturantId}
                onChange={handleChange}
                required
              />
              <button type="submit">Add Image</button>
            </form>
          </div>

          {/* Gallery Items Table */}
          <div className="gallery-table-container">
            <h2>Gallery Items</h2>
            <Table striped bordered hover className="gallery-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Restaurant ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {galleryItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img src={item.imageUrl} alt={item.description} className="gallery-image" />
                    </td>
                    <td>{item.description}</td>
                    <td>{item.resturantId}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryManage;

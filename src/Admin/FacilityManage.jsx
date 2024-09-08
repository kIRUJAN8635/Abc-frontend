import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/FacilityManage.css';
import { Navbar, Nav, Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FacilityManage = () => {
  const [facility, setFacility] = useState({
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    status: '',
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

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('https://localhost:7081/api/Facility/CustomerView');
        setFacilities(response.data);
      } catch (error) {
        console.error('Error fetching facilities data:', error);
        alert('Failed to load facilities. Please try again later.');
      }
    };

    fetchFacilities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacility({
      ...facility,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7081/api/Facility/AdminAdd', facility)
      .then(response => {
        alert('Facility added successfully!');
        setFacility({
          id: 0,
          name: '',
          description: '',
          imageUrl: '',
          status: '',
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
        // Refresh the list after adding
      })
      .catch(error => {
        console.error('There was an error adding the facility!', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7081/api/Facility/AdminDelete/${id}`);
      alert('Facility deleted successfully!');
      setFacilities(facilities.filter(facility => facility.id !== id)); // Remove from UI
    } catch (error) {
      console.error('There was an error deleting the facility!', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedFacility = { ...facility, id };
      await axios.put(`https://localhost:7081/api/Facility/AdminUpdate/${id}`, updatedFacility);
      alert('Facility updated successfully!');
      // Refresh the list after updating
    } catch (error) {
      console.error('There was an error updating the facility!', error);
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
              <Nav.Link as={Link} to="/admin/feedback">Feedback</Nav.Link>
              <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="facility-manage">
        <div className="facility-container">
          <div className="form-container">
            <h2>Add Facility</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={facility.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={facility.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={facility.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={facility.status}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="resturantId">Restaurant ID:</label>
                <input
                  type="number"
                  id="resturantId"
                  name="resturantId"
                  value={facility.resturantId}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Add Facility</button>
            </form>
          </div>
          
          <div className="table-container">
            <h2>Existing Facilities</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image URL</th>
                  <th>Status</th>
                  <th>Restaurant ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((facility) => (
                  <tr key={facility.id}>
                    <td>{facility.id}</td>
                    <td>{facility.name}</td>
                    <td>{facility.description}</td>
                    <td><img src={facility.imageUrl} alt={facility.name} className="facility-image" /></td>
                    <td>{facility.status}</td>
                    <td>{facility.resturantId}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleUpdate(facility.id)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDelete(facility.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FacilityManage;

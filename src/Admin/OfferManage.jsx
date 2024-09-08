import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/OfferManage.css';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OfferManage = () => {
  const [offer, setOffer] = useState({
    url: '',
    name: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    status: '',
    resturantId: 0,
    resturant: {
      id: 0,
      name: '',
      location: '',
      phone: '',
      overview: '',
      email: '',
    },
    imageUrl: ''  // Added image URL field
  });

  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('https://localhost:7081/api/Offer/CustomerView');
        setOffers(response.data);
      } catch (error) {
        console.error('There was an error fetching the offers!', error);
        alert('There was an error fetching the offers!');
      }
    };

    fetchOffers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleResturantChange = (e) => {
    const { name, value } = e.target;
    setOffer(prevState => ({
      ...prevState,
      resturant: {
        ...prevState.resturant,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7081/api/Offer/AdminAdd', offer);
      alert('Offer added successfully!');
      setOffer({
        url: '',
        name: '',
        description: '',
        discount: '',
        startDate: '',
        endDate: '',
        status: '',
        resturantId: 0,
        resturant: {
          id: 0,
          name: '',
          location: '',
          phone: '',
          overview: '',
          email: '',
        },
        imageUrl: ''  // Reset image URL field
      });
      // Refresh the offers list after adding a new one
      const response = await axios.get('https://localhost:7081/api/Offer/CustomerView');
      setOffers(response.data);
    } catch (error) {
      alert('There was an error adding the offer!');
      console.error('There was an error adding the offer!', error);
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`https://localhost:7081/api/Offer/AdminDelete/${offerId}`);
      alert('Offer deleted successfully!');
      setOffers(offers.filter(offer => offer.id !== offerId));
      setShowDeleteModal(false);
    } catch (error) {
      alert('There was an error deleting the offer!');
      console.error('There was an error deleting the offer!', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://localhost:7081/api/Offer/AdminUpdate/${selectedOffer.id}`, selectedOffer);
      alert('Offer updated successfully!');
      setShowUpdateModal(false);
      // Refresh the offers list after updating
      const response = await axios.get('https://localhost:7081/api/Offer/CustomerView');
      setOffers(response.data);
    } catch (error) {
      alert('There was an error updating the offer!');
      console.error('There was an error updating the offer!', error);
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

      <div className="offer-manage-container">
        <div className="left-panel">
          <h1>Add New Offer</h1>
          <form onSubmit={handleSubmit}>
            <label>
              URL:
              <input type="text" name="url" value={offer.url} onChange={handleChange} />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={offer.name} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={offer.description} onChange={handleChange} />
            </label>
            <label>
              Discount:
              <input type="text" name="discount" value={offer.discount} onChange={handleChange} />
            </label>
            <label>
              Start Date:
              <input type="datetime-local" name="startDate" value={offer.startDate} onChange={handleChange} />
            </label>
            <label>
              End Date:
              <input type="datetime-local" name="endDate" value={offer.endDate} onChange={handleChange} />
            </label>
            <label>
              Status:
              <input type="text" name="status" value={offer.status} onChange={handleChange} />
            </label>
            
            <button type="submit">Add Offer</button>
          </form>
        </div>

        <div className="right-panel">
          <h1>Existing Offers</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Discount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td><img src={offer.imageUrl || offer.url} alt={offer.name} className="menu-item-image" /></td>
                  <td>{offer.name}</td>
                  <td>{offer.description}</td>
                  <td>{offer.discount}</td>
                  <td>{new Date(offer.startDate).toLocaleString()}</td>
                  <td>{new Date(offer.endDate).toLocaleString()}</td>
                  <td>{offer.status}</td>
                  <td>
                    <Button variant="warning" onClick={() => {
                      setSelectedOffer(offer);
                      setShowUpdateModal(true);
                    }}>Edit</Button>
                    <Button variant="danger" onClick={() => {
                      setSelectedOffer(offer);
                      setShowDeleteModal(true);
                    }}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this offer?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => selectedOffer && handleDelete(selectedOffer.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <label>
              URL:
              <input type="text" name="url" value={selectedOffer?.url || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, url: e.target.value }))} />
            </label>
            <label>
              Name:
              <input type="text" name="name" value={selectedOffer?.name || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, name: e.target.value }))} />
            </label>
            <label>
              Description:
              <textarea name="description" value={selectedOffer?.description || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, description: e.target.value }))} />
            </label>
            <label>
              Discount:
              <input type="text" name="discount" value={selectedOffer?.discount || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, discount: e.target.value }))} />
            </label>
            <label>
              Start Date:
              <input type="datetime-local" name="startDate" value={selectedOffer?.startDate || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, startDate: e.target.value }))} />
            </label>
            <label>
              End Date:
              <input type="datetime-local" name="endDate" value={selectedOffer?.endDate || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, endDate: e.target.value }))} />
            </label>
            <label>
              Status:
              <input type="text" name="status" value={selectedOffer?.status || ''} onChange={(e) => setSelectedOffer(prev => ({ ...prev, status: e.target.value }))} />
            </label>
            
            <Button type="submit">Update Offer</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OfferManage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Table, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Css/MenuManage.css'; // Assuming you have a CSS file for styling

const MenuManage = () => {
  // State for form data
  const [menuItem, setMenuItem] = useState({
    id: 0,
    url: '',
    name: '',
    description: '',
    price: '',
    category: '',
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

  // State for available menu items
  const [menuList, setMenuList] = useState([]);

  // State for editing
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch available menu items from API
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get('https://localhost:7081/api/Menu/CustomerView');
      setMenuList(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching menu items!', error);
      alert('Error fetching menu items!');
    }
  };

  // Run fetchMenuItems on component mount
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // POST method to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('https://localhost:7081/api/Menu/AdminAdd', menuItem, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      alert('Menu item added successfully!');
      fetchMenuItems(); // Refresh the menu list after adding a new item
    } catch (error) {
      console.error('There was an error submitting the menu item!', error);
      alert('Error adding menu item!');
    }
  };

  // PUT method to update a menu item
  const handleUpdate = async () => {
    try {
      await axios.put(`https://localhost:7081/api/Menu/AdminUpdate/${editItem.id}`, editItem, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        }
      });
      alert('Menu item updated successfully!');
      setShowEditModal(false);
      fetchMenuItems(); // Refresh the menu list after updating
    } catch (error) {
      console.error('There was an error updating the menu item!', error);
      alert('Error updating menu item!');
    }
  };

  // DELETE method to remove a menu item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7081/api/Menu/AdminDelete/${id}`, {
        headers: {
          'Accept': '*/*'
        }
      });
      alert('Menu item deleted successfully!');
      fetchMenuItems(); // Refresh the menu list after deletion
    } catch (error) {
      console.error('There was an error deleting the menu item!', error);
      alert('Error deleting menu item!');
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

      <div className="menu-manage-container">
        {/* Add Menu Item Form - Left Side */}
        <div className="menu-form">
          <h2>Add Menu Item</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="url"
              value={menuItem.url}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
            <input
              type="text"
              name="name"
              value={menuItem.name}
              onChange={handleInputChange}
              placeholder="Menu Name"
            />
            <input
              type="text"
              name="description"
              value={menuItem.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <input
              type="text"
              name="price"
              value={menuItem.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <input
              type="text"
              name="category"
              value={menuItem.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
            <input
              type="text"
              name="status"
              value={menuItem.status}
              onChange={handleInputChange}
              placeholder="Status"
            />
            <input
              type="number"
              name="resturantId"
              value={menuItem.resturantId}
              onChange={handleInputChange}
              placeholder="Restaurant ID"
            />
            <button type="submit">Add Menu Item</button>
          </form>
        </div>

        {/* Available Menu Items - Right Side */}
        <div className="menu-list">
          <h2>Available Menu Items</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuList.map((menu) => (
                <tr key={menu.id}>
                  <td>{menu.id}</td>
                  <td>{menu.name}</td>
                  <td>{menu.description}</td>
                  <td>{menu.price}</td>
                  <td>{menu.category}</td>
                  <td>{menu.status}</td>
                  <td><img src={menu.url} alt={menu.name} className="menu-item-image" /></td>
                  <td>
                    <Button variant="warning" onClick={() => { setEditItem(menu); setShowEditModal(true); }}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(menu.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Edit Menu Item Modal */}
      {editItem && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Menu Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <input
                type="text"
                name="url"
                value={editItem.url}
                onChange={handleEditInputChange}
                placeholder="Image URL"
              />
              <input
                type="text"
                name="name"
                value={editItem.name}
                onChange={handleEditInputChange}
                placeholder="Menu Name"
              />
              <input
                type="text"
                name="description"
                value={editItem.description}
                onChange={handleEditInputChange}
                placeholder="Description"
              />
              <input
                type="text"
                name="price"
                value={editItem.price}
                onChange={handleEditInputChange}
                placeholder="Price"
              />
              <input
                type="text"
                name="category"
                value={editItem.category}
                onChange={handleEditInputChange}
                placeholder="Category"
              />
              <input
                type="text"
                name="status"
                value={editItem.status}
                onChange={handleEditInputChange}
                placeholder="Status"
              />
              <input
                type="number"
                name="resturantId"
                value={editItem.resturantId}
                onChange={handleEditInputChange}
                placeholder="Restaurant ID"
              />
              <button type="submit">Update Menu Item</button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default MenuManage;



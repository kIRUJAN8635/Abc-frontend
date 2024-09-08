import React, { useState, useEffect } from 'react';
import '../Css/Menu.css';
import axios from 'axios';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const endpoint = searchCategory
          ? `https://localhost:7081/api/Menu/Category/${searchCategory}`
          : 'https://localhost:7081/api/Menu/CustomerView';
        
        const response = await axios.get(endpoint);
        setMenuItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the menu!", error);
      }
    };

    fetchMenuItems();
  }, [searchCategory]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log("Added to cart:", item);
  };

  const calculateSubtotal = () => {
    const total = cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price;
    }, 0);
    return total.toFixed(2);
  };

  const handleOrderNow = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('subtotal', calculateSubtotal());
    navigate('/orderdetails');
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

      <div className="menu-page">
        {/* Search Input */}
        <div className="search-container">
          <Form.Group controlId="searchCategory">
            <Form.Control
              type="text"
              placeholder="Search by category..."
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="menu-cart-container">
          {/* Menu Items */}
          <div className="menu-container">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <div key={item.id} className="menu-item">
                  <img src={item.url} alt={item.name} className="menu-item-image" />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="menu-item-price">Price: Rs {item.price}</p>
                  <p className="menu-item-category">Category: {item.category}</p>
                  <button onClick={() => addToCart(item)} className="add-to-cart-button">
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No menu items available.</p>
            )}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h1><center>Cart Summary</center></h1>
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <p>{item.name} - Rs {item.price}</p>
                  </div>
                ))}
                <div className="cart-subtotal">
                  <h3>Subtotal: Rs {calculateSubtotal()}</h3>
                </div>
                <Button onClick={handleOrderNow} className="order-now-button">Order Now</Button>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;


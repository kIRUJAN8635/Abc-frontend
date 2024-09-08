import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com'; // Import EmailJS
import '../Css/OrderDetails.css';

import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const OrderDetails = () => {
  const [order, setOrder] = useState({
    date: new Date().toISOString(),
    amount: localStorage.getItem('subtotal'),
    tableBookingID: 0,
    tableBooking: {
      id: 0,
      date: new Date().toISOString(),
      type: 'Standard',
      numberOfTable: '1',
      status: 'Pending',
      customerId: 0,
      customer: {
        id: 0,
        email: 'example@example.com',
        password: 'examplePassword',
        name: 'John Doe',
        address: '123 Example Street',
        phone: '1234567890'
      }
    }
  });

  const [email, setEmail] = useState(''); // State for email input
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await axios.post('https://localhost:7081/api/Order/CustomerAdd', {
        id: 0,
        date: order.date,
        amount: order.amount,
        tableBookingID: order.tableBookingID,
        tableBooking: {
          id: order.tableBooking.id,
          date: order.tableBooking.date,
          type: order.tableBooking.type,
          numberOfTable: order.tableBooking.numberOfTable,
          status: order.tableBooking.status,
          customerId: order.tableBooking.customerId,
          customer: {
            id: order.tableBooking.customer.id,
            email: order.tableBooking.customer.email,
            password: order.tableBooking.customer.password,
            name: order.tableBooking.customer.name,
            address: order.tableBooking.customer.address,
            phone: order.tableBooking.customer.phone
          }
        }
      });

      // Format the cart items as a string
      const cartItemsString = cart
        .map(item => `${item.name} - Rs ${item.price}`)
        .join(', ');

      // Prepare email template parameters
      const emailTemplateParams = {
        to_email: email, // Recipient's email address
        date: order.date, // Order date
        amount: order.amount, // Total amount
        cart_items: cartItemsString // Formatted string of cart items
      };

      // Send email using EmailJS
      await emailjs.send('service_ncaiduy', 'template_iedf2mq', emailTemplateParams, 'GPjbokRuNu_dNHTWu');

      setNotification({ message: 'Order submitted and email sent successfully!', type: 'success' });
      setShowPopup(true);
    } catch (error) {
      console.error("There was an error submitting the order!", error);
      setNotification({ message: 'Error submitting order. Please try again.', type: 'error' });
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => setShowPopup(false);

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

      <div className="order-details-page">
        <h1><center>Order Details</center></h1>
        <div className="order-summary">
          <h2>Cart Summary</h2>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.url} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <p>{item.name}</p>
                  <p>Rs {item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="order-subtotal">
            <h3>Subtotal: Rs {order.amount}</h3>
          </div>
          
          <Form>
            {/* Email Input */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            {/* Payment Details Form */}
            <h2>Payment Details</h2>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                placeholder="Enter card number"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentDetailsChange}
              />
            </Form.Group>

            <Form.Group controlId="formExpirationDate">
              <Form.Label>Expiration Date (MM/YY)</Form.Label>
              <Form.Control
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={paymentDetails.expirationDate}
                onChange={handlePaymentDetailsChange}
              />
            </Form.Group>

            <Form.Group controlId="formCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                name="cvv"
                placeholder="Enter CVV"
                value={paymentDetails.cvv}
                onChange={handlePaymentDetailsChange}
              />
            </Form.Group>

            <Button onClick={handleSubmitOrder} className="submit-order-button">Submit Order</Button>
          </Form>
        </div>
        {showPopup && (
          <div className={`popup ${notification.type}`}>
            <p>{notification.message}</p>
            <Button onClick={handleClosePopup} className="popup-close-button">Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;

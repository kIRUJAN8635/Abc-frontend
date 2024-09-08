import React, { useState } from 'react';
import axios from 'axios';

import '../Css/Reservation.css';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';

const Reservation = () => {
  const [reservation, setReservation] = useState({
    date: '',
    type: '',
    numberOfTable: '',
    status: '',
    custiomerId: 0,
    customer: {
      id: 0,
      email: '',
      password: '',
      name: '',
      address: '',
      phone: '',
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setReservation(prevState => ({
      ...prevState,
      customer: {
        ...prevState.customer,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7081/api/TableBooking', reservation);
      alert('Reservation created successfully!');
      // Clear form or redirect if needed
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation.');
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
    <Container className="reservation-form">
      <h2>Create Reservation</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            value={reservation.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={reservation.type}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formNumberOfTable">
          <Form.Label>Number of Tables</Form.Label>
          <Form.Control
            type="number"
            name="numberOfTable"
            value={reservation.numberOfTable}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            name="status"
            value={reservation.status}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCustomerEmail">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={reservation.customer.email}
            onChange={handleCustomerChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCustomerName">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={reservation.customer.name}
            onChange={handleCustomerChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCustomerAddress">
          <Form.Label>Customer Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={reservation.customer.address}
            onChange={handleCustomerChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCustomerPhone">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={reservation.customer.phone}
            onChange={handleCustomerChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </div>
  );
};

export default Reservation;

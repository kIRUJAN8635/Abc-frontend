import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Css/ReservationManage.css';

const ReservationManage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('https://localhost:7081/api/TableBooking');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7081/api/TableBooking/${id}`);
      setReservations(reservations.filter(reservation => reservation.id !== id));
    } catch (error) {
      console.error('Error deleting reservation:', error);
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

      <div className="reservation-manage">
        <h2>Reservations</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Number of Tables</th>
              <th>Status</th>
              <th>Customer ID</th>
              <th>Customer Email</th>
              <th>Customer Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{new Date(reservation.date).toLocaleString()}</td>
                <td>{reservation.type}</td>
                <td>{reservation.numberOfTable}</td>
                <td>{reservation.status}</td>
                <td>{reservation.custiomerId}</td>
                <td>{reservation.customer.email}</td>
                <td>{reservation.customer.name}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(reservation.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ReservationManage;

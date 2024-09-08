import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Row, Col } from 'react-bootstrap';
import '../Css/Adminhome.css';

const AdminHome = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">ABC Restaurant Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/reservationmanage">Reservations</Nav.Link>
              <Nav.Link as={Link} to="/galleryManage">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/querymanage">Queries</Nav.Link>
              <Nav.Link as={Link} to="/menumanage">Menu</Nav.Link>
              <Nav.Link as={Link} to="/offermanage">Offers</Nav.Link>
              <Nav.Link as={Link} to="/facilitymanage">Facility</Nav.Link>
              <Nav.Link as={Link} to="/reviewmanage">Review</Nav.Link>
              <Nav.Link as={Link} to="/">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Admin Dashboard */}
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Reservations</h3>
              <p>View and manage all table reservations.</p>
              <Link to="/reservationmanage">
                <Button variant="primary">View Reservations</Button>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Gallary</h3>
              <p>Access detailed of Resturant, photos,details.</p>
              <Link to="/gallerymanage">
                <Button variant="primary">View gallary</Button>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Queries</h3>
              <p>Review and respond to customer queries.</p>
              <Link to="/querymanage">
                <Button variant="primary">Manage Queries</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Menu</h3>
              <p>Update and manage the restaurant's menu items.</p>
              <Link to="/menumanage">
                <Button variant="primary">Manage Menu</Button>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Offers</h3>
              <p>Create and update special offers and promotions.</p>
              <Link to="/offermanage">
                <Button variant="primary">Manage Offers</Button>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Facility</h3>
              <p>Read and manage customer facility and servive.</p>
              <Link to="/facilitymanage">
                <Button variant="primary">View Facility</Button>
              </Link>
            </div>
          </Col>
          <Col md={4}>
            <div className="admin-card">
              <h3>Manage Review</h3>
              <p>Read and manage customer Review and rating.</p>
              <Link to="/reviewmanage">
                <Button variant="primary">View Review</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;

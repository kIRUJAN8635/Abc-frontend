import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ReviewManage.css';
import { Navbar, Nav, Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ReviewManage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://localhost:7081/api/Review/GetAll');
      setReviews(response.data);
    } catch (error) {
      console.error('There was an error fetching the reviews!', error);
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`https://localhost:7081/api/Review/Delete/${id}`);
      alert('Review deleted successfully!');
      fetchReviews(); // Refresh the reviews list after deletion
    } catch (error) {
      console.error('There was an error deleting the review!', error);
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

      <Container>
        <h2>Manage Customer Reviews</h2>
        <Table striped bordered hover responsive className="review-table">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.comment}</td>
                  <td>{[...Array(5)].map((star, index) => (
                    <span key={index} className={index < review.rating ? "filled" : ""}>
                      &#9733;
                    </span>
                  ))}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      onClick={() => deleteReview(review.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No reviews available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ReviewManage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Review.css';
import { Navbar, Nav, Container,  Row, Col } from 'react-bootstrap';

const Review = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      id: 0,
      comment,
      rating: rating.toString(),
      customerId: 0,  // Replace with actual customer ID
      resturantId: 0, // Replace with actual restaurant ID
      customer: {
        id: 0,         // Replace with actual customer ID
        email: '',      // Optional: Add actual email
        password: '',   // Optional: Add actual password
        name: '',       // Optional: Add actual name
        address: '',    // Optional: Add actual address
        phone: ''       // Optional: Add actual phone
      },
      resturant: {
        id: 0,         // Replace with actual restaurant ID
        name: '',       // Optional: Add actual name
        location: '',   // Optional: Add actual location
        phone: '',      // Optional: Add actual phone
        overview: '',   // Optional: Add actual overview
        email: ''       // Optional: Add actual email
      }
    };

    try {
      await axios.post('https://localhost:7081/api/Review/CustomerAdd', reviewData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Review submitted successfully!');
      // Clear form fields after submission
      setComment('');
      setRating(0);
      setHover(0);
      fetchReviews(); // Refresh the reviews list
    } catch (error) {
      console.error('There was an error submitting the review!', error);
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
      
      <Container>
        <Row>
          <Col md={6}>
            <div className="review-container">
              <h2>Submit Your Review</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rating:</label>
                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button type="submit">Submit Review</button>
              </form>
            </div>
          </Col>
          <Col md={6}>
            <div className="reviews-list">
              <h2>Customer Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-rating">
                      {[...Array(5)].map((star, index) => (
                        <span key={index} className={index < review.rating ? "filled" : ""}>
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Review;

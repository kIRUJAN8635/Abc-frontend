import React, { useState } from 'react';
import axios from 'axios';
import '../Css/Query.css';
import { Navbar, Nav, Container, Button, Form, Row, Col } from 'react-bootstrap';

const Query = () => {
    const [query, setQuery] = useState({
        text: '',
        date: '',
        status: '',
        customer: {
            id: 0,
            email: '',
            password: '',
            name: '',
            address: '',
            phone: ''
        },
        staffId: 0,
        staff: {
            id: '',
            name: '',
            address: '',
            phone: '',
            email: '',
            password: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuery((prevQuery) => ({
            ...prevQuery,
            [name]: value
        }));
    };

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setQuery((prevQuery) => ({
            ...prevQuery,
            customer: {
                ...prevQuery.customer,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7081/api/Querys/CustomerAdd', query);
            console.log(response.data);
            alert('Query submitted successfully');
        } catch (error) {
            console.error('There was an error submitting the query!', error);
            alert('Failed to submit the query. Please try again later.');
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
            <Container className="query-container">
                <h2 className="text-center">Submit Your Query</h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="queryText">
                            <Form.Label>Query Text</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="text" 
                                value={query.text} 
                                onChange={handleChange} 
                                placeholder="Enter your query..." 
                                required 
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="queryDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="date" 
                                value={query.date} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        
                    </Row>

                    <h4 className="mt-4">Customer Information</h4>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="customerName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={query.customer.name} 
                                onChange={handleCustomerChange} 
                                placeholder="Enter customer's name..." 
                                required 
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="customerEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={query.customer.email} 
                                onChange={handleCustomerChange} 
                                placeholder="Enter customer's email..." 
                                required 
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="customerAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="address" 
                                value={query.customer.address} 
                                onChange={handleCustomerChange} 
                                placeholder="Enter customer's address..." 
                                required 
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} controlId="customerPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="phone" 
                                value={query.customer.phone} 
                                onChange={handleCustomerChange} 
                                placeholder="Enter customer's phone number..." 
                                required 
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" block>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Query;

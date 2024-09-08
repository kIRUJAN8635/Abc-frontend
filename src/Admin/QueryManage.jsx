import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar,Nav,Table, Container, Button } from 'react-bootstrap';
import '../Css/QueryManage.css';
import { Link } from 'react-router-dom';


const QueryAdminView = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get('https://localhost:7081/api/Querys/AdminView');
                setQueries(response.data);
            } catch (error) {
                console.error('Error fetching query data:', error);
                alert('Failed to load queries. Please try again later.');
            }
        };

        fetchQueries();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7081/api/Querys/AdminDelete/${id}`);
            setQueries(queries.filter(query => query.id !== id));
            alert('Query deleted successfully');
        } catch (error) {
            console.error('Error deleting query:', error);
            alert('Failed to delete the query. Please try again later.');
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

        <Container className="query-admin-view-container">
            <h2 className="text-center my-4">Customer Queries</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Customer Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map((query) => (
                        <tr key={query.id}>
                            <td>{query.id}</td>
                            <td>{query.text}</td>
                            <td>{new Date(query.date).toLocaleString()}</td>
                            <td>{query.status}</td>
                            <td>{query.customer.name}</td>
                            <td>{query.customer.email}</td>
                            <td>{query.customer.phone}</td>
                            <td>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDelete(query.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
    );
};

export default QueryAdminView;

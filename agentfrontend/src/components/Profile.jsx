import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'; // Custom CSS for styling

const Profile = () => {
    const { id } = useParams();
    const [agent, setAgent] = useState(null);

    useEffect(() => {
        // Fetch agent data by ID (mocked here, replace with actual data fetch)
        fetch(`http://localhost:3030/agents/${id}`)
            .then(response => response.json())
            .then(data => setAgent(data))
            .catch(error => console.error('Error fetching agent:', error));
    }, [id]);

    if (!agent) return <p>Loading...</p>;

    return (
        <Container className="mt-5">
            <Card>
                <Card.Img variant="top" src={`http://localhost:3030/images/` + agent.imageUrl} className='agent-image'/>
                <Card.Body>
                    <Card.Title>{agent.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        <i className="bi bi-geo-alt"></i> {agent.sector}, {agent.city}
                    </Card.Subtitle>
                    <Card.Text>
                        <div>
                            <span><strong>6812 Views</strong></span>
                            <span className="ml-3"><strong>7 Enquiries</strong></span>
                        </div>
                        <div>
                            <strong>{agent.transactions} Total Transactions</strong>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                <Row className="mt-4">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item>
                                <Nav.Link eventKey="details">Details</Nav.Link>
                            </Nav.Item> */}
                            <Nav.Item>
                                <Nav.Link eventKey="recent-deals">Recent Deals</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><strong>{agent.experience}+ Years of Experience</strong></ListGroupItem>
                                    <ListGroupItem><strong>Has 3 Employees working with him</strong></ListGroupItem>
                                    <ListGroupItem><strong>Social Media Enthusiast</strong></ListGroupItem>
                                    <ListGroupItem><strong>Native of Samastipur, Bihar</strong></ListGroupItem>
                                    <ListGroupItem><strong>Speaks {agent.languages}</strong></ListGroupItem>
                                </ListGroup>
                            </Tab.Pane>
                            <Tab.Pane eventKey="details">
                                <Card.Body>
                                    <Card.Title>Details</Card.Title>
                                    <p>{agent.details}</p>
                                </Card.Body>
                            </Tab.Pane>
                            <Tab.Pane eventKey="recent-deals">
                                <Card.Body>
                                    <Card.Title>Recent Deals</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroupItem>MMR Mansions - Dwarka Expressway Delhi side, Gurgaon</ListGroupItem>
                                        <ListGroupItem>Rise Retail - Greater Noida West, Noida</ListGroupItem>
                                        <ListGroupItem>Tata Raagem - Hebbal to Airport, Bangalore</ListGroupItem>
                                        <ListGroupItem>Signature Global Park 4 and 5 - Sohna, Gurgaon</ListGroupItem>
                                        <ListGroupItem>MMR Golf Hills Sec 79 - New Gurgaon Near NH8, Gurgaon</ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                                <Card.Body>
                                    <Card.Title>Reviews</Card.Title>
                                    <p>No reviews yet.</p>
                                </Card.Body>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default Profile;

import React, { useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import sellerService from "../../service/seller.service";

const AdminDashboard = () => {
  // Sample list of sellers, replace with actual data fetched from API or elsewhere
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Seller 1",
      email: "seller1@example.com",
      phone: "123-456-7890",
      status: "pending",
    },
    {
      id: 2,
      name: "Seller 2",
      email: "seller2@example.com",
      phone: "987-654-3210",
      status: "pending",
    },
    // Add more sellers as needed
  ]);

  const onAccept = (sellerId) => {
    // Remove the seller with the given id from the list
    const updatedSellers = sellers
      .map((seller) => {
        if (seller.id === sellerId) {
          const updatedSeller = { ...seller, status: "accepted" };
          sellerService.updateSeller(updatedSeller); // Update seller status
          return null; // Returning null to remove the seller from the list
        }
        return seller;
      })
      .filter(Boolean); // Filter out null values

    setSellers(updatedSellers);
  };

  const onReject = (sellerId) => {
    // Remove the seller with the given id from the list
    const updatedSellers = sellers
      .map((seller) => {
        if (seller.id === sellerId) {
          const updatedSeller = { ...seller, status: "rejected" };
          sellerService.updateSeller(updatedSeller); // Update seller status
          return null; // Returning null to remove the seller from the list
        }
        return seller;
      })
      .filter(Boolean); // Filter out null values

    setSellers(updatedSellers);
  };

  return (
    <Container>
      <h2>Sellers List</h2>
      <Row>
        {sellers.map((seller) => (
          <Col key={seller.id} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{seller.name}</Card.Title>
                <Card.Text>Email: {seller.email}</Card.Text>
                <Card.Text>Phone: {seller.phone}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="success" onClick={() => onAccept(seller.id)}>
                    Accept
                  </Button>
                  <div className="mx-2"></div> {/* Add space between buttons */}
                  <Button variant="danger" onClick={() => onReject(seller.id)}>
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;

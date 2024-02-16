import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import sellerService from "../../service/seller.service";

import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  // Sample list of sellers, replace with actual data fetched from API or elsewhere
  const [unverifiedSellers, setUnverifiedSellers] = useState([]);

  const navigate = useNavigate();

  // set all unverifed sellers
  useEffect(() => {
    sellerService
      .getAllUnverifiedSellers()
      .then((data) => {
        console.log(data.data);
        setUnverifiedSellers(data.data);
      })
      .catch((err) => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
        notifyError("unauthorize request");

        console.log(err);
      });
  }, []);

  const onAccept = (sellerId) => {
    // Remove the seller with the given id from the list

    sellerService
      .verifySeller(sellerId)
      .then((data) => {
        notify(`seller with ${sellerId} removed successfully`);
        // update the unverified sellers list
        const updatedSellers = unverifiedSellers.filter(
          (unverifiedSeller) => unverifiedSeller.sellerID !== sellerId
        );

        console.log(updatedSellers);
        // set updatedSellers as new state
        setUnverifiedSellers(updatedSellers);
      })
      .catch((error) => {
        notifyError("error while removing seller");
      });
  };

  const onReject = (sellerId) => {
    // Remove the seller with the given id from the list
    const updatedSellers = unverifiedSellers
      .map((seller) => {
        if (seller.id === sellerId) {
          const updatedSeller = { ...seller, status: "rejected" };
          sellerService.updateSeller(updatedSeller); // Update seller status
          return null; // Returning null to remove the seller from the list
        }
        return seller;
      })
      .filter(Boolean); // Filter out null values

    setUnverifiedSellers(updatedSellers);
  };

  // toast buttons
  const notifyError = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const notify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      <h2>Unverified Sellers List</h2>
      <Row>
        {unverifiedSellers.map((unverifiedSeller) => (
          <Col key={unverifiedSeller.sellerID} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>
                  {unverifiedSeller.firstName} {unverifiedSeller.lastName}
                </Card.Title>
                <Card.Text>Email: {unverifiedSeller.email}</Card.Text>
                <Card.Text>
                  Mobile Number: {unverifiedSeller.mobileNumber}
                </Card.Text>
                <Card.Text>Pan Number: {unverifiedSeller.panNumber}</Card.Text>

                {/* <div className="d-flex justify-content-between align-items-center"> */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => onAccept(unverifiedSeller.sellerId)}
                  >
                    Accept
                  </Button>
                  {/* <div className="mx-2"></div> Add space between buttons */}
                  <Button
                    variant="danger"
                    onClick={() => onReject(unverifiedSeller.sellerId)}
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default AdminDashboard;

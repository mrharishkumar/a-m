import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import Product from "../Product/Product";

import { createAPIEndpoint, ENDPOINTS } from "../../services/api.service";
import authService from "../../services/auth.service";

import "./AssetDetail.scss";

const AssetDetail = (props) => {
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = () => {
    const token = authService.getAuthToken();
    setRemarks("");

    if (!token) {
      authService.logout();
      navigate("/");
    } else {
      createAPIEndpoint(ENDPOINTS.ASSETREQUESTADD)
        .create(
          {
            asset_id: props.serial_number,
            remarks: remarks,
          },
          token
        )
        .then((res) => {
          props.onHide();
          if (res.status === 200) {
            toast("Request has been submitted.");
            props.getAllAssets();
          } else toast("Failed to submit request.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="AssetDetail">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className="mx-4 mt-4 text-capitalize text-secondary fst-italic"
        >
          Asset Detail
        </Modal.Header>
        <Modal.Body className="ps-5 pe-5">
          <Container fluid>
            <Row>
              <Col md={6}>
                <Product asset={props} />
              </Col>
              <Col md={6}>
                <Form>
                  <Form.Group className="mb-3  fst-italic" controlId="status">
                    <Form.Label>Remark</Form.Label>

                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "340px" }}
                      name="rs"
                      onChange={handleChange}
                      value={remarks}
                      required={true}
                    />
                  </Form.Group>

                  <div className="text-end mt-4">
                    <Button
                      className="btn btn-success px-4 "
                      onClick={handleSubmit}
                      disabled={!remarks}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssetDetail;

import React, { useState, useEffect, useCallback } from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Product from "../Product/Product";

import authService from "../../services/auth.service";
import { createAPIEndpoint, ENDPOINTS } from "../../services/api.service";

import "./ProductList.scss";

const ProductList = () => {
  const [assets, setAssets] = useState();
  const navigate = useNavigate();

  const getAllAssets = useCallback(() => {
    const accessToken = authService.getAuthToken();

    if (!accessToken) {
      authService.logout();
      navigate("/");
    } else {
      createAPIEndpoint(ENDPOINTS.ASSET)
        .fetchAll(accessToken)
        .then((response) => {
          setAssets(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [navigate]);

  useEffect(() => {
    getAllAssets();
  }, [getAllAssets]);

  return (
    <div className="ProductList p-5">
      <Container fluid>
        <Row key={Math.random()}>
          <Col md={4} key={Math.random()} className="mt-2">
            <img
              className="logo"
              src="assets/images/ibs-logo-big.png"
              alt="logo"
            />
          </Col>
          <Col key={Math.random()} md={4}></Col>
          <Col md={4} key={Math.random()}>
            <h3 className="title glow float-end">Available assets</h3>
          </Col>
        </Row>
        <Row
          sm={2}
          md={5}
          className="justify-content-center py-3"
          key={Math.random()}
        >
          {assets &&
            assets.map((asset) => (
              <Product
                key={asset.serial_number}
                asset={asset}
                withButton={true}
              />
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;

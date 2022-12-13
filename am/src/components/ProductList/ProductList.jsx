import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";

import Product from "../Product/Product";

import authService from "../../services/auth.service";
import { createAPIEndpoint, ENDPOINTS } from "../../services/api.service";

import "./ProductList.scss";

const ProductList = () => {
  const [assets, setAssets] = useState();

  const accessToken = authService.getAuthToken();

  const getAllAssets = () => {
    createAPIEndpoint(ENDPOINTS.ASSET)
      .fetchAll(accessToken)
      .then((response) => {
        setAssets(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  return (
    assets && (
      <div className="ProductList">
        <Container>
          <Row key={Math.random()}>
            <Col md={6} key={Math.random()}>
              <div className="logo float-left">
                <a href="/">
                  <img
                    className="logo top-heading"
                    href="/MyDevice"
                    src="assets/images/impressico-logo.png"
                    alt="logo"
                  />
                </a>
              </div>
              <span>Impressico Business Solutions</span>
            </Col>
            <Col md={6} key={Math.random()}>
              <h3 className="title">Available assets</h3>
            </Col>
          </Row>
          <hr key={Math.random()} />
          <Row
            sm={2}
            lg={4}
            className="justify-content-center"
            key={Math.random()}
          >
            {assets.map((asset) => (
              <Product key={asset.id} asset={asset} />
            ))}
          </Row>
        </Container>
      </div>
    )
  );
};

export default ProductList;

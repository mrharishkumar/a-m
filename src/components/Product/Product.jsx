import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AssetDetail from "../AssetDetail/AssetDetail";

import "./Product.scss";

const Product = ({ asset, withButton }) => {
  const { asset_name, company, image_url, model, serial_number } = asset;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="Product">
      <Card className="Card">
        <Container fluid>
          <Row className="justify-content-center">
            <Card.Img
              variant="top"
              src={
                image_url ||
                "https://i.ytimg.com/vi/gxq12nBwjog/maxresdefault.jpg"
              }
              style={{ width: "90%" }}
            />
          </Row>
          <Row>
            <Card.Body className="">
              <Container fluid>
                <Row>
                  <Card.Title className="text-capitalize fw-bold text-decoration-underline text-truncate">
                    {asset_name} - {company}
                  </Card.Title>
                </Row>
                <Row>
                  <Card.Text>
                    <li className="text-capitalize text-truncate ">
                      <span className="fw-bold">Model: </span>
                      {model}
                    </li>
                    <li className="text-truncate">
                      <span className="fw-bold ">Serial No:</span>{" "}
                      {serial_number}
                    </li>
                  </Card.Text>
                </Row>
                {withButton && (
                  <Button
                    className="mt-4"
                    variant="primary "
                    onClick={() => setModalShow(true)}
                  >
                    Request
                  </Button>
                )}
              </Container>

              <AssetDetail
                title={asset_name}
                image_url={image_url}
                model={model}
                serial_number={serial_number}
                asset_name={asset_name}
                company={company}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </Card.Body>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Product;

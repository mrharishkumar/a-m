import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AssetDetail from "../AssetDetail/AssetDetail";

import "./Product.scss";

const Product = ({ asset }) => {
  const { asset_name, company, image_url, model, serial_number } = asset;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="Product">
      <Card className="Card">
        <Card.Img
          variant="top"
          src={
            image_url || "https://i.ytimg.com/vi/gxq12nBwjog/maxresdefault.jpg"
          }
        />
        <Card.Body>
          <Card.Title style={{ textDecoration: "underline" }}>
            {asset_name} - {company}
          </Card.Title>
          <Card.Text>
            <li>Model: {model}</li>
            <li>Serial No: {serial_number}</li>
          </Card.Text>
          <Button variant="primary " onClick={() => setModalShow(true)}>
            Request
          </Button>
          <AssetDetail
            title={asset_name}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;

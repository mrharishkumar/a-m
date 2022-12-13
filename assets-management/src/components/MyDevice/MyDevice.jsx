import React, { useCallback, useEffect, useState } from "react";
import "../MyDevice/MyDevice.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Table from "react-bootstrap/Table";

const MyDevice = () => {
  const [details, setDetails] = useState([]);
  var myCookies = document.cookie
    .split(";")
    .find((row) => row.startsWith("access_token"))
    ?.split("=")[1];
  console.log("cokiee", myCookies);

  const api = useCallback(async () => {
    var data = "";
    try {
      var config = {
        method: "get",
        url: "http://localhost:8000/api/assets/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Token + ${myCookies}`,
        },
        withCredentials: true,
        data: data,
      };

      const response = await axios(config);
      const info = response.data;
      console.log("resp", info);
      setDetails([...info]);
      console.log("state", details);
    } catch (err) {
      console.log(err.message);
    }
  }, [details, myCookies]);

  useEffect(() => {
    api();
  }, [api]);
  return (
    <Container>
      <Row className="pt-2">
        <Col md={6}>
          <div className="logo float-left">
            <a href="MyDevice">
              <img
                className="logo top-heading"
                style={{
                  overflow: "hidden",
                  display: "inline-block",
                  paddingTop: "5px",
                }}
                href="/MyDevice"
                src="/assets/images/impressico-logo.png"
                alt="logo"
              />
            </a>
          </div>
          <span
            style={{
              fontWeight: "bold",
              textShadow: "inherit",
              color: "#000",
            }}
          >
            Impressico Business Solutions
          </span>
        </Col>
        <Col className="title">
          <h3> My Device </h3>
        </Col>
      </Row>
      <hr />

      <Row className="mt-2">
        <Container fluid className="Devicecard_bg">
          <Row className="info_bg pt-3">
            <Table striped bordered hover responsive="md">
              <thead>
                <tr>
                  <th>Asset Name</th>
                  <th>Model Number</th>
                  <th>Asset Company</th>
                  <th>Serial Number</th>
                </tr>
              </thead>
              <tbody>
                {details.map((e) => {
                  return (
                    <tr>
                      <td>{e.asset_name}</td>
                      <td>{e.model_number}</td>
                      <td>{e.asset_company}</td>
                      <td>{e.serial_number}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default MyDevice;

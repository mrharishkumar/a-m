import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdDone } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
// import Pagination from "react-bootstrap/Pagination";
import { RxCross2 } from "react-icons/rx";
import CountUp from "react-countup";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { createAPIEndpoint, ENDPOINTS } from "../../services/api.service";
import tokenService from "../../services/token.service";
import authService from "../../services/auth.service";

import "../MyDevice/MyDevice.scss";
import { useCallback } from "react";

const MyDevice = () => {
  const [details, setDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  //Dropdown hover
  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const loadData = useCallback(() => {
    const token = authService.getAuthToken();

    if (!token) {
      authService.logout();
      navigate("/");
    } else {
      createAPIEndpoint(ENDPOINTS.ASSETREQUEST)
        .fetchAll(tokenService.getAccessToken())
        .then((response) => {
          setDetails(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  const handleDelete = (e) => {
    const token = authService.getAuthToken();
    if (token === null) {
      authService.logout();
      navigate("/");
    } else {
      createAPIEndpoint(ENDPOINTS.DELETEASSETREQUEST)
        .delete(e.id, tokenService.getAccessToken())
        .then(() => {
          loadData();
        });
    }
  };

  const Page = ({ totalPost, postsPerPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPost / postsPerPage); i++) {
      pages.push(i);
    }
  };


  //Pagination
  let active = 1;
  let items = [];
  for (let number = 1; number <= 2; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const total = details.length;
    setCount(total);
    loadData();
  }, [details.length, loadData]);

  const handleSelect = (e) => {
    setStatusFilter(e);
    setCount(filterDetails(details, e).length);
  };

  const filterDetails = (detailsArr, value) => {
    return detailsArr.filter((detail) => {
      if (!value) return detail;
      return detail.status.toLowerCase() === value;   
    });
  };

  return (
    <div className="My_device p-5 ">
      <Container fluid>
        <Row className="pt-1">
          <Col md={4} className="mt-2">
            <img
              className="logo  float-left top-heading"
              src="/assets/images/ibs-logo-big.png"
              alt="logo"
            />
          </Col>
          <Col md={4}></Col>
          <Col md={4}>
            <h3 className="title glow float-end"> My Device </h3>
          </Col>
        </Row>
        <Row className="pt-4">
          <Container fluid className="Devicecard_bg">
            <Row className="info_bg pt-2 ">
              <Table hover responsive="md">
                <thead>
                  <tr className="text-center text-uppercase">
                    <th> S.No</th>
                    <th>Asset Id</th>

                    <th className="text-center">Remark</th>
                    <th className="position-relative py-1">
                      <Dropdown
                        drop="up"
                        show={show}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                        onSelect={handleSelect}
                      >
                        <Dropdown.Toggle className="bg-white text-dark fw-bold text-uppercase ">
                          {statusFilter
                            ? `STATUS ${statusFilter}`
                            : `STATUS ALL`}
                          <span className="position-absolute translate-middle-y badge rounded-pill bg-danger">
                            <CountUp end={count} />+
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant="dark">
                          <Dropdown.Item active eventKey="">
                            ALL
                          </Dropdown.Item>
                          <Dropdown.Divider className="bg-secondary" />
                          <Dropdown.Item eventKey="granted">
                            Granted
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="pending">
                            Pending
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="denied">
                            Denied
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {details &&
                    filterDetails(details, statusFilter).map((detail, idx) => {
                      const { id, asset_id, remarks, status } = detail;

                      return status === "PENDING" ? (
                        <tr
                          key={id}
                          className=" text-center bg-light text-dark"
                        >
                          <td className="pt-4">{idx + 1}</td>
                          <td className="pt-4">{asset_id}</td>
                          <td className="pt-4 text-uppercase">{remarks}</td>
                          <td className="pt-4 text- text-uppercase fw-bolder">
                            {status}
                          </td>
                          <td className=" pt-4">
                            <MdDelete
                              onClick={() => handleDelete(detail)}
                              className="del-icon text-danger"
                            />
                          </td>
                        </tr>
                      ) : status === "GRANTED" ? (
                        <tr
                          key={id}
                          className=" text-center bg-light text-dark"
                        >
                          <td className="pt-4">{idx + 1}</td>
                          <td className="pt-4">{asset_id}</td>
                          <td className="pt-4 text-uppercase">{remarks}</td>
                          <td className="pt-4 text-success text-uppercase fw-bolder">
                            {status}
                          </td>
                          <td className=" pt-4">
                            <MdDone className="done-icon " />
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={id}
                          className=" text-center bg-light text-dark"
                        >
                          <td className="pt-4">{idx + 1}</td>
                          <td className="pt-4">{asset_id}</td>
                          <td className="pt-4 text-uppercase">{remarks}</td>
                          <td className="pt-4 text-danger text-uppercase fw-bolder">
                            {status}
                          </td>
                          <td className=" pt-4">
                            <RxCross2 className=" fs-2 text-danger" />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Stack spacing={2}>
                  <Pagination count={2}  page={1}  color="primary" className="pb-4 pt-2" />
                 
                </Stack>
              </div>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

export default MyDevice;

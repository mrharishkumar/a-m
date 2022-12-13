import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "./AssetDetail.scss";

const AssetDetail = (props) => {
  
  return (
    <div className="AssetDetail">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton className="mx-4 mt-4">
          <Modal.Title id="contained-modal-title-vcenter">
          <h4>{props.title || "Title"}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="ps-5 pe-5">
         
          <p>
            {props.detail ||
              "You can plug the Logitech B100 wired optical mouse into the USB port of your computer or laptop, and it will be ready for use. It sports an ambidextrous design that lets both right- and left-handed users use it conveniently. Plus, its robust build ensures a reliable lifespan."}
          </p>
          <hr />
          <Form>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Note</Form.Label>

              <Form.Control
          
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </Form.Group>

            
            <div className="text-end mt-4">
              <Button className="btn btn-success px-4 " onClick={props.onHide}>
                Submit
              </Button>
              
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssetDetail;

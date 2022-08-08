import React, { useEffect } from "react";
import "./modal.scss";
import { Modal, Button } from "react-bootstrap";
import lottie from "lottie-web";
import success from "../../lotties/success.json";

export default function MyVerticallyCenteredModal(props) {
  useEffect((e) => {
    // e.preventDefault();
    lottie.loadAnimation({
      container: document.getElementById("success"),
      animationData: success,
    });
  },);

  return (
    // displays a modal when post is submitted successfully
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.text}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="lottieCenter" id="success" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btnClose">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    // modal end
  );
}

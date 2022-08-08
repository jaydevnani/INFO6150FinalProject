import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import lottie from "lottie-web";
import error from "../../lotties/error.json";

export default function ErrorModal(props) {
  // Error modal lottie animation
  useEffect((e) => {
    // e.preventDefault();
    lottie.loadAnimation({
      container: document.getElementById("error"),
      animationData: error,
    });
  },);

  return (
    // displays modal component when there is an error
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter"><h6>Error! {JSON.stringify(props.text)}</h6></Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="deleteLottie" id="error" />
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btnClose">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    // -----Modal end -----
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Modal, Dropdown } from "react-bootstrap";
import lottie from "lottie-web";
import deleted from "../../lotties/delete.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/errorModal/ErrorModal";
import "./modalDelete.scss";

export default function ModalDelete(props) {
  const [show, setShow] = useState(false);
  const { accessToken, username } = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect((e) => {
    lottie.loadAnimation({
      container: document.getElementById("deleted"),
      animationData: deleted,
    });
  });

  const handleClose = () => {
    setShow(true);
  };

  const handleDelete = async (e, postId) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:9000/api/posts/${props.id}`,
        {
          headers: {
            token: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("deleted");
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      props.onHide();
      setError(error.response.data);
      setModalShow(true);
    }
  };

  return (
    <>
      {/* -----display modal when post needs to be deleted----- */}
      <Modal
        show={show}
        onHide={handleClose}
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h5>{props.text}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="deleteLottie" id="deleted" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} className="modalButtonYes">
            Yes
          </Button>
          <Button onClick={props.onHide} className="modalButtonNo">
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        {/* -----error modal component----- */}
        <ErrorModal
          text={error}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
        {/* -----error modal end ----- */}
      </div>
    </>
  );
}

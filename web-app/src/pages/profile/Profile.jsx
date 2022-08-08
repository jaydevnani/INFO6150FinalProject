import React, { useEffect, useState } from "react";
import "./profile.scss";
import { Form, Button, Row, Col } from "react-bootstrap";
import MyVerticallyCenteredModal from "../../components/modal/Modal";
import axios from "axios";
import { useRef } from "react";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function Profile() {
  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }
  
  const [modalShowProfile, setModalShowProfile] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    firstName.current.value = user.firstName;
    lastName.current.value = user.lastName;
    userName.current.value = user.username;
    email.current.value = user.email;
  }, []);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setEdit(true);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setEdit(false);
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      username: userName.current.value,
      password: password.current.value,
    };

    console.log("user =", newUser);
    try {
      const res = await axios.put(
        `http://localhost:9000/api/users/${user._id}`,
        newUser,
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res data profile = ", res.data);
      const accessToken = user.accessToken;
      const newData = { ...res.data, accessToken };
      console.log("new data = ", newData);
      localStorage.setItem("user", JSON.stringify(newData));
      setIsDisabled(true);
      setEdit(false);
      setModalShowProfile(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setModalShow(true);
    }
  };

  return (


    <div className="profile">
      <div className="profileWrapper">
        <div className="profileContent">
          <div className="profilePictureDiv">
            <img
              className="profilePicture"
              src="assets/Picture.JPG"
              alt="profile_picture"
            />
          </div>

          {/* Form Component for profile */}
          <div className="profileForm">

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" disabled={true} ref={email} />
              </Form.Group>
            </Form>

            <Form onSubmit={handleSubmitClick}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter firstname"
                      disabled={isDisabled}
                      ref={firstName}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter lastname"
                      disabled={isDisabled}
                      ref={lastName}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  disabled={isDisabled}
                  ref={userName}
                  required
                />
              </Form.Group>

              {edit ? (
                <Form.Group className="mb-3">
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new Password"
                    disabled={isDisabled}
                    required
                    ref={password}
                  />
                </Form.Group>
              ) : null}

              {edit ? (
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new Password"
                    disabled={isDisabled}
                    required
                    ref={confirmPassword}
                  />
                </Form.Group>
              ) : null}

              <div className="profileBtnDiv">
                {edit ? null : (
                  <Button
                    className="profileEditBtn"
                    type="submit"
                    onClick={handleEditClick}
                  >
                    Edit Details
                  </Button>
                )}
                {edit ? (
                  <Button
                    className="profileSaveBtn"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                ) : null}
                {edit ? (
                  <Button
                    className="profileSaveBtn"
                    type="submit"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
              <MyVerticallyCenteredModal
                text="Changes Saved!"
                show={modalShowProfile}
                onHide={() => setModalShowProfile(false)}
              />
            </Form>
          </div>
          {/* ------Form end------ */}
        </div>
      </div>

      {/* Displays modal to show an error */}

      <ErrorModal
        text={error}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </div>
  );
}

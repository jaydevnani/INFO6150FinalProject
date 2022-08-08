import { Row, Col, Button, Form } from "react-bootstrap";
import "./register.scss";
import login from "../../lotties/login.json";
import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function Register() {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect((e) => {
    lottie.loadAnimation({
      container: document.getElementById("login"),
      animationData: login,
    });
  }, []);


// sending user entered data to get OTP
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const response = await axios.post(
            "http://localhost:9000/api/auth/otp",
            {
              email: email.current.value,
              firstName: firstName.current.value,
              lastName: lastName.current.value,
            }
        );
        const otp = response.data.otp;
        navigate("/otp", { state: { emailOtp: otp, user: user } });
      } catch (error) {
        console.log(error);
        setError(error.response.data);
        setModalShow(true);
      }
    }
  };

  return (
      <div>
        <Row className="registerRow">
          <Col className="registerRight">
            <div id="login" style={{ width: 500, height: 500 }} />
          </Col>
          <Col className="registerLeft">
            <img src="assets/logo.jpg" alt="logo" />
            <h1 className="registerTitle mb-3">Welcome!</h1>

            {/* -----Form Component - react bootstrap----- */}

            <Form className="registerForm" onSubmit={handleCreateAccount}>
              <Form.Group className="mb-2 registerField">
                <Form.Control
                    type="firstName"
                    placeholder="Enter first name"
                    required
                    ref={firstName}
                />
              </Form.Group>
              <Form.Group className="mb-2 registerField">
                <Form.Control
                    type="lastName"
                    placeholder="Enter last name"
                    required
                    ref={lastName}
                />
              </Form.Group>
              <Form.Group className="mb-2 registerField">
                <Form.Control
                    type="username"
                    placeholder="Enter username"
                    required
                    ref={username}
                />
              </Form.Group>
              <Form.Group className="mb-2 registerField">
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    ref={email}
                />
              </Form.Group>
              <Form.Group className="mb-2 registerField">
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    required
                    ref={password}
                />
              </Form.Group>
              <Form.Group className="mb-2 registerField">
                <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                    required
                    ref={confirmPassword}
                />
              </Form.Group>
              <Button type="submit" className="registerButton">
                Verify with OTP
              </Button>
            </Form>
            <span className="loginMutedText">
            Already have an account?
            <span className="loginSignup">
              <a href="/login"> Login</a>
            </span>
          </span>
          </Col>
        </Row>
        {/* -----Form Component end----- */}

        {/* ------Displaying error modal----- */}
        <ErrorModal
            text={error}
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
        />
        {/*-----Error modal end ---- */}
      </div>
  );
}
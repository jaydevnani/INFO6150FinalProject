import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import lottie from "lottie-web";
import login from "../../lotties/login.json";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function Login() {
  const email = useRef();
  const password = useRef();
  let navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  // on page load it loads lottie file
  useEffect((e) => {
    lottie.loadAnimation({
      container: document.getElementById("login"),
      animationData: login,
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log("user from react = " + user.email);
      const res = await axios.post(
        "http://localhost:9000/api/auth/login",
        user
      );
      console.log("res after success of api call = " + res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log("data saved in memory");
      document.location.href = "/";
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      setModalShow(true);
    }
  };

  return (
    <div>
      <Row className="loginRow">
        <Col className="loginLeft">
          <img src="assets/logo.jpg" alt="logo" />
          <h1 className="loginTitle mb-3">Welcome back!</h1>
          {/* -----Form to login - used react bootstrap form -----*/}

          <Form className="loginForm " onSubmit={handleLogin}>
            <Form.Group className="mb-3 loginField">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                ref={email}
              />
            </Form.Group>
            <Form.Group className="mb-3 loginField">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
                ref={password}
              />
            </Form.Group>
            <Button
              type="submit"
              className="loginButton"
            >
              Log In
            </Button>
          </Form>
          <span className="loginMutedText">
            Don't have an account yet?
            <span className="loginSignup">
              <a href="/register"> Register</a>
            </span>
          </span>
        </Col>

        {/* Lottie file for login page */}

        <Col className="loginRight">
          <div id="login" style={{ width: 500, height: 500 }} />
        </Col>
      </Row>

      {/* Modal to display the error  */}

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

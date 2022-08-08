import { Row, Col, Button, Form } from "react-bootstrap";
import "./otp.scss";
import lottie from "lottie-web";
import otpLottie from "../../lotties/otp.json";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorModal from "../../components/errorModal/ErrorModal";

export default function Otp() {
  const otp = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("otp"),
      animationData: otpLottie,
    });
  }, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const emailOtp = location.state.emailOtp;
    const user = location.state.user;

    if (otp.current.value != emailOtp) {
      setError("otp not matched");
      setModalShow(true);
    } else {
      try {
        await axios.post("http://localhost:9000/api/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log("register api error = ", error);
        setError(error.response.data);
        setModalShow(true);
      }
    }
  };

  return (
    <div>
      <Row className="registerRow">
        <Col className="registerRight">
          <div id="otp" style={{ width: 500, height: 500 }} />
        </Col>
        <Col className="registerLeft">
          <img src="assets/logo.jpg" alt="logo" />
          <h1 className="registerTitle mb-3">Welcome!</h1>
          <span className="loginMutedText">Please enter the One Time Password to verify your account.</span>
          <span className="loginMutedText mb-3">A code has been sent to your email.</span>
          <Form className="registerForm" onSubmit={handleCreateAccount}>
            <Form.Group className="mb-3 registerField">
              <Form.Control
                type="firstName"
                placeholder="Enter OTP"
                required
                ref={otp}
              />
            </Form.Group>
            <Button type="submit" className="registerButton">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
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

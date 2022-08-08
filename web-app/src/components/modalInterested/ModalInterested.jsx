import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";

export default function ModalInterested(props) {
  const REACT_APP_STRIPE =
    "pk_test_51KHITAJ71VPiEiAhIHysXpuG3p9NzEAAQtz1pGYsEMJZsgPEztMZYGEQeGmoBsEOax0yXIBBivRf5BeKtrTaOQ3l00OAMkoWZp";
  const [stripeToken, setStripeToken] = useState(null);

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = null;
  }

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      console.log("token = " + stripeToken.id);
      try {
        const res1 = await axios.post(
          "http://localhost:9000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 9.99 * 100,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("res react = " + res1.data);
        try {
          console.log("props id" + props.selectedpost._id);
          const res2 = await axios.post(
            "http://localhost:9000/api/interested",
            {
              postIdforUserModel: props.selectedpost._id,
              objectforPostModel: {
                userId: user._id,
                username: user.username,
                status: "Pending",
              },
            },
            {
              headers: {
                token: `Bearer ${user.accessToken}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          props.onHide();
          console.log("res interested = " + res2.data);
          props.onHide();
          window.location.reload();
          try {
            const res3 = await axios.post(
              "http://localhost:9000/api/conversation",
              {
                senderId: user._id,
                receiverId: props.selectedpost.userId,
              }
            );
            console.log("conversation must be initiated ======");
          } catch (error3) {
            console.log(error3);
          }
        } catch (error2) {
          console.log("error from interested api");
          console.log(error2);
        }
      } catch (error1) {
        console.log(error1);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <>
      {/* ----- Payment modal - when user sends request---- */}
      <Modal show={props.show} backdrop="static" keyboard={false} {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Payment 💳</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please pay to send a request to the owner if you are interested in
          joining the plan.
        </Modal.Body>
        <Modal.Footer></Modal.Footer>

        {/* Stripe Component */}
        <StripeCheckout
          name="Family Plan Finder"
          billingAddress
          shippingAddress
          description={`Your total is $9.99`}
          amount={9.99 * 100}
          token={onToken}
          stripeKey={REACT_APP_STRIPE}
        ></StripeCheckout>
        {/* Stripe Component end */}
      </Modal>
    </>
  );
}

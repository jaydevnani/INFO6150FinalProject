import express from "express";
import * as checkoutController from "./../controllers/checkout-controller.js";
import * as verifyTokenController from "./../controllers/verify-token-controller.js";

import stripe from "stripe";
const stripeWithKey = stripe(
  "sk_test_51KHITAJ71VPiEiAhAfRAtIMDwEn0jpFTd45sQRRE54te89SjiV0i733o39miXzyzmxX6hkLdTYVJk9tBSssJXstf00roIBQKBH"
);

const router = express.Router();

// taking payment if user is interested in some post
router.post("/payment", verifyTokenController.verifyToken, (req, res) => {
  stripeWithKey.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log("error = " + stripeErr);
        res.status(500).json(stripeErr);
      } else {
        console.log("res = " + stripeRes);
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;

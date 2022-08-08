import express from "express";
import * as interestedController from "./../controllers/interested-controller.js";
import * as verifyTokenController from "./../controllers/verify-token-controller.js";

const router = express.Router();

// send a request to the owner to join his family plan
router.post("/", verifyTokenController.verifyToken, interestedController.post);

// change the status of the post once owner accept or rejects the request
router.post(
  "/status",
  verifyTokenController.verifyToken,
  interestedController.updateStatus
);

export default router;

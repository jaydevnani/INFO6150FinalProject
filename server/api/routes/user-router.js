import express from "express";
import * as userController from "./../controllers/user-controller.js";
import * as verifyTokenController from "./../controllers/verify-token-controller.js";

const router = express.Router();

// get user details 
router.get("/", verifyTokenController.verifyToken, userController.get);

// update user details
router.put("/:id", verifyTokenController.verifyToken, userController.update);

export default router;

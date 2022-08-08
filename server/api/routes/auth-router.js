import express from "express";
import * as authController from "./../controllers/auth-controller.js";

const router = express.Router();

// register a new user
router.route("/register").post(authController.register);

// log on the user
router.route("/login").post(authController.login);

// send otp while registering
router.route("/otp").post(authController.otp);

export default router;

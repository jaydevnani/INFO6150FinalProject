import express from "express";
import * as postController from "./../controllers/post-controller.js";
import * as verifyTokenController from "./../controllers/verify-token-controller.js";

const router = express.Router();

// get all all post excluding the one created by the owner
router.get(
  "/all/:id",
  verifyTokenController.verifyToken,
  postController.getAll
);

// get all requested posts of a user
router.get("/myRequests/:id", postController.getMyRequests);

// submit a new post to the database
router.post("/", verifyTokenController.verifyToken, postController.post);

// get a single post by id
router.get("/:id", verifyTokenController.verifyToken, postController.get);

// update a post
router.put("/:id", verifyTokenController.verifyToken, postController.update);

// delete a post
router.delete(
  "/:id",
  verifyTokenController.verifyToken,
  postController.deleteById
);

// get all post of a user
router.get(
  "/profile/:userid",
  verifyTokenController.verifyToken,
  postController.getByUser
);

export default router;

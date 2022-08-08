import express from "express";
import Conversation from "../models/conversation.js";

import * as verifyTokenController from "../controllers/verify-token-controller.js";

const router = express.Router();

// fetching all the conversation of a user
router.post("/", async (req, res) => {
  let check = false;
  try {
    const conversation = await Conversation.find({});

    if (conversation) {
      conversation.map((con) => {
        if (
          (con.members[0] === req.body.senderId ||
            con.members[0] === req.body.receiverId) &&
          (con.members[1] === req.body.senderId ||
            con.members[1] === req.body.receiverId)
        ) {
          check = true;
        }
      });
    }

    if (!check) {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });

      try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err2) {
        res.status(500).json(err2);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// set the conversation when user click on particular conversation
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;

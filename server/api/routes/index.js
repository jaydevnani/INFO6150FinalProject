import authRouter from "./auth-router.js";
import userRouter from "./user-router.js";
import postRouter from "./post-router.js";
import checkoutRouter from "./checkout-router.js";
import conversation from "./conversation-router.js";
import messages from "./messages-router.js";
import interested from "./interested-router.js";

export default (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/checkout", checkoutRouter);
  app.use("/api/conversation", conversation);
  app.use("/api/messages", messages);
  app.use("/api/interested", interested);
};

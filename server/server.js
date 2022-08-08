import app from "./api/app.js";

const port = process.env.PORT;

/**
 * starting server on specified post
 */
app.listen(port, () => {
  console.log(`Server running at ${port}.`);
});

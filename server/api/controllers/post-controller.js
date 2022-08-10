import * as postService from "./../services/post-service.js";

// setting success response for when program is successful
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

// setting error response for when program runs into some sort of error
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// get all post for a user
export const getAll = async (request, response) => {
  try {
    const postsArray = await postService.getRequestedPostsId(request.params.id);
    const posts = await postService.getAll(request.params.id, postsArray);
    setSuccessResponse(posts, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// get all requested posts
export const getMyRequests = async (request, response) => {
  try {
    const postsArray = await postService.getRequestedPostsId(request.params.id);
    const posts = await postService.getMyRequests(postsArray);
    setSuccessResponse(posts, response);
  } catch (error) {
    console.log(error);
    setErrorResponse(error, response);
  }
};

// Create a new Post
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const post = await postService.save(payload);
    setSuccessResponse(post, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// Get a single post
export const get = async (request, response) => {
  try {
    const post = await postService.get(request.params.id);
    setSuccessResponse(post, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// Updating a post
export const update = async (request, response) => {
  try {
    const post = await postService.get(request.params.id);
    const updatedPost = await postService.update(post, request.body);
    setSuccessResponse({ comment: "User has been updated" }, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// Deleting a post
export const deleteById = async (request, response) => {
  try {
    const post = await postService.get(request.params.id);
    const deletedPost = await postService.deletePost(post);
    setSuccessResponse({ comment: "Post has been deleted" }, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// Retreving all the posts by username 
export const getByUser = async (request, response) => {
  try {
    const usersPost = await postService.getPostsForUser(request.params.userid);
    setSuccessResponse(usersPost, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

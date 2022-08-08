import * as postService from "./../services/post-service.js";

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

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

// create a new post
export const post = async (request, response) => {
  try {
    const payload = request.body;
    const post = await postService.save(payload);
    setSuccessResponse(post, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// get a single post
export const get = async (request, response) => {
  try {
    const post = await postService.get(request.params.id);
    setSuccessResponse(post, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// update a post
export const update = async (request, response) => {
  try {
    const post = await postService.get(request.params.id);
    const updatedPost = await postService.update(post, request.body);
    setSuccessResponse({ comment: "User has been updated" }, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// delete a post
export const deleteById = async (request, response) => {
  try {
    const post = await postService.get(request.params.id);
    const deletedPost = await postService.deletePost(post);
    setSuccessResponse({ comment: "Post has been deleted" }, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// get all post of a user by username
export const getByUser = async (request, response) => {
  try {
    const usersPost = await postService.getPostsForUser(request.params.userid);
    setSuccessResponse(usersPost, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

import * as userService from "./../services/user-service.js";

// setting success response for when program is successful
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

// setting error response for when program runs into an error of some kind
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// get user details by userId or username
export const get = async (request, response) => {
  try {
    const userId = request.query.userId;
    const username = request.query.username;
    const user = userId
      ? await userService.getById(userId)
      : await userService.getByUsername(username);
    const { password, updatedAt, ...other } = user._doc;
    setSuccessResponse(other, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// update user detail by getting user id
export const update = async (request, response) => {
  try {
    const user = await userService.getById(request.params.id);
    const updatedUser = await userService.updateById(user, request.body);
    const newUser = await userService.getById(request.params.id);
    setSuccessResponse(newUser, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

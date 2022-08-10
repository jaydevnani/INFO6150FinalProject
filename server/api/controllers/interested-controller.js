import * as interestedService from "./../services/interested-service.js";

// setting success response for when program is successful
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

// setting error response for when program is successful
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// When interested in someone else's plan
export const post = async (request, response) => {
  try {
    const user = await interestedService.getByIdUser(
      request.body.objectforPostModel.userId
    );
    await interestedService.addInUser(user, request.body.postIdforUserModel);
    const post = await interestedService.getByIdPost(
      request.body.postIdforUserModel
    );
    await interestedService.addInPost(post, request.body.objectforPostModel);
    setSuccessResponse({ comment: "Processed Successfully" }, response);
  } catch (error) {
    console.log("interested-controller ran failed");
    setErrorResponse(error, response);
  }
};

export const updateStatus = async (request, response) => {
  try {
    const post = await interestedService.updateStatus(
      request.body.userId,
      request.body.postId,
      request.body.status
    );
    setSuccessResponse({ comment: "Updated Successfully" }, response);
  } catch (error) {
    console.log(error);
    console.log("interested-controller ran failed");
    setErrorResponse(error, response);
  }
};

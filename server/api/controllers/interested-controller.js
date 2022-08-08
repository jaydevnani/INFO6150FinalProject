import * as interestedService from "./../services/interested-service.js";

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

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

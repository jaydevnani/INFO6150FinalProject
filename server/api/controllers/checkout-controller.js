import * as checkoutService from "./../services/checkout-service.js";

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
    console.log("tokenId = " + request.body.tokenId);
    console.log("amount = " + request.body.amount);
    const stripeResponse = await checkoutService.post(
      request.body.tokenId,
      request.body.amount
    );
    console.log("stripeResponse = " + stripeResponse);
    setSuccessResponse(stripeResponse, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};


// This is for Stripe Configuration

import * as checkoutService from "./../services/checkout-service.js";

// setting success response for when program is successful
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

// setting error response for when program is runs into any error
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// payment gateway success
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

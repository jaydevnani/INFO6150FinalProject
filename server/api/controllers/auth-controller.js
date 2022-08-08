import * as authService from "./../services/auth-service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// register a new user by get all the details
export const register = async (request, response) => {
  try {
    const payload = request.body;
    const contact = await authService.save(payload);
    console.log("contact = ", contact);
    setSuccessResponse(contact, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

// log on the user by take email and password
export const login = async (request, response) => {
  try {
    const email = request.body.email;
    const user = await authService.findUser(email);

    console.log("user in controller = " + user);

    if (!user) {
      setErrorResponse("User not found", response);
    } else {
      const validPassword = await bcrypt.compare(
        request.body.password,
        user.password
      );

      if (!validPassword) {
        setErrorResponse("Wrong password", response);
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        setSuccessResponse({ ...others, accessToken }, response);
      }
    }
  } catch (error) {
    console.log("err in controller" + error);
    setErrorResponse(error, response);
  }
};

// send otp while registering by taking email address
export const otp = async (request, response) => {
  try {
    const payload = request.body;
    const data = await authService.sendOtp(payload);
    setSuccessResponse(data, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

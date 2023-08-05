const {
  responseConstant,
  responseCodeConstant,
  serverConstant,
  apiConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const {
  checkExistingUser,
} = require("../controllers/authentication/authenticationHelper");

const jwt = require("jsonwebtoken");

/**
 * This middleware function is used for verifying the JWT token for a route. It uses the JWT_SECRET_KEY from the .env file to verify the token. It also checks if the user exists in the database.
 * If the user exists, it adds the username to the request body. If the user does not exist, it sends a generic failure response.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @async
 * @example
 * // possible responses for this endpoint
 *  {
 *    "data": {},
 *    "message": "Token expired. Please signin again." | "You are not authorized. Please signin again."
 *    "code": 401
 *  }
 * @memberof module:app/middlewares
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 * @param {object} next is the callback function that is used to call the middleware function which is after the this middleware function.
 */
const verifyJWT = async (req, res, next) => {
  /**
   * This default object is used to send the response back to the client.
   * @default
   * @type {object}
   */
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    /**
     * Verify and decode the JWT token.
     */
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    /**
     * This is done for extra verification. The decoded JWT token already contains the username. But, we are checking if the user exists in the database.
     * Check if the user exists in the database using the username from the decoded JWT token.
     */
    const existingUser = await checkExistingUser(decodedData?.username);

    /**
     * Uncomment he below line to replace the username from the decoded JWT token with "test".
     * This will cause the middleware to fail, as the username from the decoded JWT token will not match the username from the database.
     **/
    // existingUser.username = "test";

    /**
     * If username from the decoded JWT token matches the username from the database, add the username to the request body.
     */
    if (existingUser?.username === decodedData?.username) {
      req.body["username"] = decodedData?.username;
    } else {
      throw new Error();
    }
    next(); // Call the next middleware function if everything is successful.
  } catch (error) {
    response.message = `${responseConstant.UNAUTHORIZED}`;
    response.code = responseCodeConstant.UNAUTHORIZED;
    if (error.name === "TokenExpiredError") {
      response.message = `${responseConstant.TOKEN_EXPIRED}`;
    }
    let generatedResponse = responseBuilder(response);
    logger(error);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyJWT };

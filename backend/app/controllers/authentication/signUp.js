const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { encrypt } = require("../../../utils/passwordUtils");

const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");
const { generateJWT } = require("../../../utils/generateJWT");
const User = require("../../models/user");
const { checkExistingUser } = require("./authenticationHelper");

/**
 * POST /api/signup
 * <br/>
 * This function is used to sign up a user. It first checks if the user exists in the database using {@link module:app/controllers/authentication|checkExistingUser} function. If the user exists, it sends a failure response.
 * If username, password and email (optional) doesn't match the Joi schema, it sends a failure response with the appropriate message in the response body. This is done in the {@link module:app/middlewares|verifyRequest} from the middlewares folder.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @async
 * @example
 * // possible responses for this endpoint (along with JWT token in the response headers)
 *  {
 *    "data": {},
 *    "message": "Sign up successful." | "Username already taken. Please try again." | "Please provide valid data." | "/signup failed."
 *    "code": 200 | 409 | 400 | 500
 *  }
 * @memberof module:app/controllers/authentication
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 */
const signUp = async (req, res) => {
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
    const userData = req.body;

    const existingUser = await checkExistingUser(userData.username); // Check if user exists in the database.
    if (existingUser) {
      response.message = `${responseConstant.USER_ALREADY_REGISTERED}`;
      response.code = responseCodeConstant.ALREADY_EXISTS;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const encryptedPassword = await encrypt(userData.password); // Encrypt the password provided by the user and store the hash in the database.
    const newUser = new User({
      username: userData.username,
      password: encryptedPassword,
      email: userData?.email,
    });

    const data = await User.create(newUser); // Create a new user in the database.

    response.message = `${responseConstant.SIGNUP_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);

    const token = generateJWT({ username: data.username }); // Generate a JWT token and send it in the response headers.

    /**
     * We can also set the JWT token in a cookie. This is useful when we want to use the JWT token for authentication in the frontend.
     */
    // const maxCookieAge = JSON.parse(process.env.MAX_COOKIE_AGE);
    // res.cookie(apiConstant.ACCESS_TOKEN, token, {
    //   maxAge: maxCookieAge,
    //   httpOnly: true,
    // });

    /**
     * Before setting the Authorization header, we need to expose it to the client. We do this by setting the Access-Control-Expose-Headers header, which is done in the app.js file.
     */
    return res
      .setHeader("Authorization", `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.SIGN_UP} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };

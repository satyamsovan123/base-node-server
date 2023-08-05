/**
 * These are the constants used throughout the application. These are related to the response messages.
 * @constant
 * @type {object}
 * @memberof module:constants
 */
const responseConstant = {
  STATUS_SUCCESSFUL: "is successful.",
  STATUS_FAILURE: "failed.",
  IS_REQUIRED: "is required.",
  IS_EMPTY: "is empty.",
  IS_INVALID: "is invalid.",
  CANNOT_BE_EMPTY: "cannot be empty.",
  PLEASE_PROVIDE_VALID_DATA: "Please provide valid data.",
  PLEASE_REMOVE_EXTRA_FIELDS: "Please remove extra data.",
  UNAUTHORIZED: "You are not authorized. Please signin.",
  TOKEN_EXPIRED: "Token expired. Please signin again.",
  USER_ALREADY_REGISTERED: "Username already taken. Please try again.",
  USER_NOT_REGISTERED: "No username found. Please signup.",
  USER_NOT_REGISTERED: "No username found. Please signup.",
  INVALID_CREDENTIALS: "Please provide valid credentials.",
  SIGNUP_SUCCESSFUL: "Sign up successful.",
  SIGNIN_SUCCESSFUL: "Sign in successful.",
  SIGN_OUT_SUCCESSFUL: "Sign out successful.",
  POST_SUCCESSFUL: "Post successful.",
  NO_DATA_FOUND: "No data found.",
};

/**
 * These are the constants used throughout the application. These are related to the fields in the request body.
 * @constant
 * @type {object}
 * @memberof module:constants
 */
const fieldConstant = {
  USERNAME: "Username",
  EMAIL: "Email",
  PASSWORD: "Password",
  ARTICLE: "Article",
  TITLE: "Title",
  DATE: "Date",
};

/**
 * These are the constants used throughout the application. These are the response codes.
 * @constant
 * @type {object}
 * @memberof module:constants
 */
const responseCodeConstant = {
  GENERIC_FAILURE: 500,
  GENERIC_SUCCESS: 200,
  INVALID_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409,
};

module.exports = { responseConstant, responseCodeConstant, fieldConstant };

/**
 * These are the constants used throughout the application. These are related to the API.
 * @constant
 * @type {object}
 * @memberof module:constants
 */
const apiConstant = {
  DATA: "/data",
  FILE: "/file",
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  SIGN_OUT: "/signout",
  WEB_SOCKET: "/websocket",
  ACCESS_TOKEN: "access_token",
};

/**
 * These are the constants used throughout the application. These are related to the HTTP verbs.
 * @constant
 * @type {object}
 * @memberof module:constants
 */
const apiVerb = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

module.exports = { apiConstant, apiVerb };

const { CustomResponse } = require("../app/models/customResponse");

/**
 * This function builds the response object to be sent to the client. It is used in all the controllers.
 * @param {*} response is the response object from the controller.
 * @example const generatedResponse = responseBuilder(response); // { data: {}, message: "Success", code: 200 }
 * @memberof module:utils
 * @returns {CustomResponse} response object.
 */
const responseBuilder = (response) => {
  const customResponse = new CustomResponse(
    response.data,
    response.message,
    response.code
  );

  return customResponse.build();
};

module.exports = { responseBuilder };

const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const moment = require("moment");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");
const Post = require("../../models/post");

/**
 * POST /api/data
 * <br/>
 * This function is used to post data to the database.
 * If title and article doesn't match the Joi schema, it sends a failure response with the appropriate message in the response body. This is done in the {@link module:app/middlewares|verifyRequest} from the middlewares folder.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @async
 * @example
 * // possible responses for this endpoint
 *  {
 *    "data": {
        "username": "",
        "title": "",
        "article": "",
        "_id": "",
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
      } | {},
 *    "message": "/data successful." | "Token expired. Please signin again." | "Please provide valid data." | "/data failed."
 *    "code": 200 | 401 | 400 | 500
 *  }
 * @memberof module:app/controllers/data
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 */
const postData = async (req, res) => {
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
    const newPost = new Post({
      title: userData.title,
      article: userData.article,
      username: userData.username,
    }); // Create a new post object.
    const data = await Post.create(newPost); // Save the post object to the database.

    response.data = data; // Send the saved post object in the response body.
    response.message = `${responseConstant.POST_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_FAILURE;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { postData };

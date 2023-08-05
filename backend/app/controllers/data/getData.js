const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const Post = require("../../models/post");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");

const { paginationOptions } = require("../../../configs/paginationOptions");
const { sanitizeURLQueryParam } = require("../../../utils");

/**
 * GET /api/data?offset=0
 * <br/>
 * This function is used to get all the data from the database. It uses the pagination options from the {@link module:configs|paginationOptions} file and the {@link module:utils|sanitizeURLQueryParam} function to sanitize the offset from the query params.
 * If no data is found, it sends a failure response.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @async
 * @example
 * // possible responses for this endpoint
 *  {
 *    "data": {
 *      "docs": [{ "username": "", "title": "", "article": "", "createdAt": "" }],
 *      "totalDocs": 0,
 *      "offset": 0,
 *      "limit": 0
 *    } | {},
 *    "message": "/data successful." | "No data found." | "Token expired. Please signin again." | "/data failed."
 *    "code": 200 | 404 | 401 | 500
 *  }
 * @memberof module:app/controllers/data
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 */
const getData = async (req, res) => {
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
    const offset = sanitizeURLQueryParam(req.query.offset); // Get the offset from the query params and sanitize it using the {@link module:utils|sanitizeURLQueryParam} function from the utils folder.
    paginationOptions.offset = offset;

    /**
     * Get the data from the database using the pagination options.
     */
    const data = await Post.paginate({}, paginationOptions, (error, result) => {
      if (error) {
        logger(error);
        response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
        response.code = responseCodeConstant.GENERIC_ERROR;
        const generatedResponse = responseBuilder(response);
        return res.status(generatedResponse.code).send(generatedResponse);
      }
      return result;
    });

    /**
     * If no data is found, send a failure response.
     */
    if ((data && data.length === 0) || !data) {
      response.message = `${responseConstant.NO_DATA_FOUND}`;
      response.code = `${responseCodeConstant.NOT_FOUND}`;
      const generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    response.data = data;
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_SUCCESSFUL}`;
    const generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    const generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

/**
 * GET /api/random-data
 * <br/>
 * This function is used to get a random data from the database. This endpoint does not use pagination and doen not uses verifyJWT middleware.
 * If no data is found, it sends a failure response.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @async
 * @example
 * // possible responses for this endpoint
 *  {
 *    "data": { "username": "", "title": "", "article": "", "createdAt": "" } | {},
 *    "message": "/data successful." | "No data found." | "/data failed."
 *    "code": 200 | 404 | 500
 *  }
 * @memberof module:app/controllers/data
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 */
const getRandomData = async (req, res) => {
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
    const data = await Post.find({}).select(
      "title article username createdAt -_id"
    ); // Get all the data from the database.

    /**
     * If no data is found, send a failure response.
     */
    if (data.length === 0) {
      response.code = `${responseCodeConstant.NOT_FOUND}`;
      response.message = `${responseConstant.NO_DATA_FOUND}`;
      const generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const randomIndex = Math.floor(Math.random() * data.length); // Get a random index from the data array.
    response.data = data[randomIndex]; // Get the data at the random index.
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_SUCCESSFUL}`;
    const generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    const generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getData, getRandomData };

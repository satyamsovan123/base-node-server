const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const Post = require("../../models/post");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");

const mongoosePaginate = require("mongoose-paginate-v2");

const { paginationOptions } = require("../../../configs/paginationOptions");
const { sanitizeURLQueryParam } = require("../../../utils");

const getData = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const offset = sanitizeURLQueryParam(req.query.offset);
    paginationOptions.offset = offset;

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

const getRandomData = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const data = await Post.find({}).select(
      "title article username createdAt -_id"
    );
    if (data.length === 0) {
      response.code = `${responseCodeConstant.NOT_FOUND}`;
      response.message = `${responseConstant.NO_DATA_FOUND}`;
      const generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    response.data = data[randomIndex];
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

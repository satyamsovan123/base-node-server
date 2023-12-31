/**
 * This file is used to export all the routes. It is used in app.js.
 * @module app/routes
 * @requires app/routes/data
 * @requires app/routes/authentication
 */

const express = require("express");
const app = express();
const router = express.Router();
const { responseBuilder } = require("../../utils/responseBuilder");

const { responseCodeConstant, serverConstant } = require("../../constants");

const baseURL = serverConstant.BASE_API;

router.use(baseURL, require("./authentication"));
router.use(baseURL, require("./data"));

router.get("/", (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.SERVER_HEALTH_STATUS_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };

  try {
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstant.SERVER_HEALTH_STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_FAILURE;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

router.use("*", (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.URI_PATH_NOT_FOUND} Please use ${serverConstant.SERVER_URL}${serverConstant.BASE_API} to access the API.`,
    code: responseCodeConstant.NOT_FOUND,
  };
  try {
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    response.message = `${serverConstant.GENERIC_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_FAILURE;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

module.exports = router;

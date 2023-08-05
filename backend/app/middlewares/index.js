/**
 * @file This file contains all the middlewares used in the application. It exports all the middlewares as an object.
 * @module app/middlewares
 * @export app/middlewares/verifyRequest
 * @export app/middlewares/verifyJWT
 * @export app/middlewares/ignoreAuthentication
 */
const { verifyRequest } = require("../middlewares/verifyRequest");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { ignoreAuthentication } = require("./ignoreAuthentication");

module.exports = {
  verifyRequest,
  verifyJWT,
  ignoreAuthentication,
};

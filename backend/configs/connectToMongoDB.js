const mongoose = require("mongoose");
const { logger } = require("../utils");
const { serverConstant, responseCodeConstant } = require("../constants");
const { responseBuilder } = require("../utils/responseBuilder");
const { CustomResponse } = require("../app/models/customResponse");
require("dotenv").config();

/**
 * This function connects to the MongoDB database using mongoose.
 * It is wrapped in a try-catch block to catch any errors. If an error occurs, the error is logged and a generic response is returned.
 * @async
 * @memberof module:configs
 * @returns {CustomResponse} response object.
 */
const connectToMongoDB = async () => {
  const uri = process.env.MONGO_DB_URI; // MongoDB Atlas URI
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(uri, options).then(
    () => {
      // If the connection is successful, a success message is logged.
      logger(serverConstant.DATABASE_CONNECTION_SUCCESS);
    },
    (error) => {
      // If an error occurs, the error is logged and a generic response is returned.
      let response = {
        data: error,
        message: `${serverConstant.DATABASE_CONNECTION_FAILURE}`,
        code: responseCodeConstant.GENERIC_FAILURE,
      };
      let generatedResponse = responseBuilder(response);
      logger(generatedResponse);
      return generatedResponse;
    }
  );
};

module.exports = { connectToMongoDB };

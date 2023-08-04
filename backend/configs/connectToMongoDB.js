const mongoose = require("mongoose");
const { logger } = require("../utils");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
} = require("../constants");
const { responseBuilder } = require("../utils/responseBuilder");
require("dotenv").config();

const connectToMongoDB = async () => {
  const uri = process.env.MONGO_DB_URI;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(uri, options).then(
    () => {
      logger(serverConstant.DATABASE_CONNECTION_SUCCESS);
    },
    (error) => {
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

/**
 * @file This file is used to export all the files in the configs folder.
 * @module configs
 * @export connectToMongoDB
 * @export {@link} paginationOptions
 */
const { connectToMongoDB } = require("./connectToMongoDB");
const { paginationOptions } = require("./paginationOptions");

module.exports = {
  connectToMongoDB,
  paginationOptions,
};

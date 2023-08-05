/**
 * @file This file is the entry point for all the controllers/data. It exports all methods from the controllers/data.
 * @module app/controllers/data
 * @export app/controllers/data/postData
 * @export app/controllers/data/getRandomData
 * @export app/controllers/data/getData
 */
const { getData, getRandomData } = require("./getData");
const { postData } = require("./postData");

module.exports = {
  getData,
  getRandomData,
  postData,
};

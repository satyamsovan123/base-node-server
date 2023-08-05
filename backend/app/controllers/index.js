/**
 * @file This file is the entry point for all the controllers. It exports all the controllers.
 * @module app/controllers
 * @requires app/controllers/data
 * @requires app/controllers/authentication
 */
const { postData } = require("./data/postData");
const { getData, getRandomData } = require("./data/getData");
const { getWebSocketData } = require("./getWebSocketData/getWebSocketData");
const { signIn } = require("./authentication/signIn");
const { signUp } = require("./authentication/signUp");
const { signOut } = require("./authentication/signOut");

module.exports = {
  postData,
  getData,
  getRandomData,
  getWebSocketData,
  signIn,
  signUp,
  signOut,
};

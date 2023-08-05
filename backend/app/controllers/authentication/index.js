/**
 * @file This file is the entry point for all the controllers/authentication. It exports all methods from the controllers/authentication.
 * @module app/controllers/authentication
 * @export app/controllers/authentication/signUp
 * @export app/controllers/authentication/signIn
 * @export app/controllers/authentication/signOut
 * @export app/controllers/authentication/authenticationHelper
 */
const { signUp } = require("./signUp");
const { signIn } = require("./signIn");
const { signOut } = require("./signOut");

module.exports = {
  signUp,
  signIn,
  signOut,
};

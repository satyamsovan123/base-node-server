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

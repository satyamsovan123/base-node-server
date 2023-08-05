/**
 * This file is used to export all the routes for authentication. It contains routes for signup, signin and signout.
 * It also uses the verifyRequest middleware to verify the request before processing it wherever required.
 * @memberof app/routes
 * @exports app/routes/authentication
 */
const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/authentication/signUp");
const { signIn } = require("../controllers/authentication/signIn");
const { signOut } = require("../controllers/authentication/signOut");
const { verifyRequest } = require("../middlewares/verifyRequest");

router.post("/signup", verifyRequest, signUp);
router.post("/signin", verifyRequest, signIn);
router.get("/signout", signOut);

module.exports = router;

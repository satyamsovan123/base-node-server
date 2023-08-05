/**
 * Schema for mongoose user schema.
 * @typedef {mongoose.Schema} user
 * @property {string} username - The username to validate.
 * @property {string} email - The email to validate.
 * @property {string} password - The password to validate.
 */
/**
 * This mongoose model represents the {@link user|user} collection in the database.
 * @constant
 * @memberof app/models
 * @exports app/models/user
 */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false, default: "" },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("user", userSchema);

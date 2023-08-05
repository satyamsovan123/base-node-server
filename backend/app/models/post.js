const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * @typedef {mongoose.Schema} post
 * @property {string} title - The title field to validate.
 * @property {string} article - The article field to validate.
 * @property {string} username - The username field to validate.
 */
/**
 * This mongoose model represents the {@link post|post} collection in the database.
 * @constant
 * @memberof app/models
 * @exports app/models/post
 */
const postSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    article: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("post", postSchema);

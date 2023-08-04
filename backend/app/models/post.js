const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

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

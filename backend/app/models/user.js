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

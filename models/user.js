const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);

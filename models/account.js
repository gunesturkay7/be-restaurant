const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  amount: Number,
  date: Date,
  tableId: Number,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

module.exports = mongoose.model("Account", AccountSchema);

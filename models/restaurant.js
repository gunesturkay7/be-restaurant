const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  organizationId: {
    type: String,
    required: true,
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tables: [Number],
  recentAccounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);

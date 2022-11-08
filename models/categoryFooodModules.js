// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoryFoodSchema = new Schema(
  {
    IndexCategory: {
      type: Number,
      query: true,
    },
    categoryName: {
      type: String,
      query: true,
    },
    IDnumber: {
      type: String,
      query: true,
    },
  },

  { timestamps: true }
);
//
const CategoryFoodModule = mongoose.model("CategoryFood", CategoryFoodSchema);
module.exports = CategoryFoodModule;

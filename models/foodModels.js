// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const FoodSchema = new Schema(
  {
    //thể loại mặc định
    //đồ chế biến
    //Đồ uống pha chế
    //Không chế biến
    //Món combo
    //Món buffet
    CategoryDefault: {
      type: String,
      query: true,
    },

    //Tên đồ ăn
    NameFood: {
      type: String,
      query: true,
    },

    //Mô tả
    Describe: {
      type: String,
      query: true,
    },

    //giá
    Price: {
      type: String,
      query: true,
    },

    //Danh mục món do người dùng tạo
    CategoryFood: {
      type: String,
      query: true,
    },

    //giá VAT
    PriceVAT: {
      type: String,
      query: true,
    },

    //món hot
    FoodHot: {
      type: Boolean,
      query: true,
      default: false,
    },

    //món mới
    FoodNew: {
      type: Boolean,
      query: true,
      default: false,
    },

    //món ăn chỉ có trong buffet
    OnlyBuffet: {
      type: Boolean,
      query: true,
      default: false,
    },

    //=================
    //trạng thái còn or hết của món ăn
    Status: {
      type: Boolean,
      query: true,
      default: true,
    },
    IDnumber: {
      type: String,
      query: true,
    },
    //so luuong
    count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
//
const FoodModule = mongoose.model("Food", FoodSchema);
module.exports = FoodModule;

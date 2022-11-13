// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const kitchenSchema = new Schema(
  {
    //Tài khoản order
    IDAccountOrder: {
      type: String,
      query: true,
    },

    //Tên người đặt
    NameAccountOrder: {
      type: String,
      query: true,
    },

    //Mã hóa đơn
    codeBill: {
      type: String,
      query: true,
    },

    //đồ ăn order
    OrderNumberIDFood: [
      {
        IDFood: String,
        quantity: Number,
      },
    ],
    //tổng tiền
    amount: {
      type: Number,
      default: 0,
    },
    //trạng thái đơn hàng
    status: {
      type: Boolean,
      default: false,
    },
    //hoàn thành chưa ?
    Complete: {
        type: Boolean,
        default: false,
    },
    //bàn đang ngồi
    tableNumberID: {
      type: String,
      query: true,
    },
    //phục vụ
    service: {
      type: Boolean,
    }
  },
  { timestamps: true }
);
//
const kitchenModule = mongoose.model("kitchen", kitchenSchema);
module.exports = kitchenModule;

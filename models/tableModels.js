// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TableSchema = new Schema(
  {
    //tên bàn
    nameTable: {
      type: String,
      query: true,
    },

    //có người hay không
    StatusTable: {
      type: Boolean,
      query: true,
      default: false,
    },
    IDnumberSector: {
      type: String,
      query: true,
    },
    //IDnumber
    IDnumber: {
      type: String,
      query: true,
    },
  },
  { timestamps: true }
);
//
const TableModule = mongoose.model("Table", TableSchema);
module.exports = TableModule;

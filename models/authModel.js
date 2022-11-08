// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    TowFA: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      query: true,
    },
    password: {
      type: String,
      query: true,
    },
    secret: {
      ascii: String,
      hex: String,
      base32: String,
      otpauth_url: String,
    },
    role: {
      type: String,
      query: true,
      default: "Admin",
    },
    Name: {
      type: String,
      query: true,
      default: "AccountHRM",
    },
    islock: {
      type: Boolean,
      query: true,
      default: false,
    },
    NameRestaurant: {
      type: String,
      query: true,
    },
  },
  { timestamps: true }
);
//
const AccountModule = mongoose.model("Account", AccountSchema);
module.exports = AccountModule;

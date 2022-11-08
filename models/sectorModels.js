// Using Node.js `require()`
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectorSchema = new Schema(
    {
        //Tài khu vực
        SectorName: {
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
const sectorModule = mongoose.model("sector", sectorSchema);
module.exports = sectorModule;

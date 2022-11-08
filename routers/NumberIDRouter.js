const express = require("express");
const router = express.Router();

const NumberIDControllers = require('../controllers/NumberIDControllers');

//Tạo order
router.post("/create-numberid", NumberIDControllers.createNumberID)


module.exports = router;
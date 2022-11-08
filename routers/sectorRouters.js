const express = require("express");
const router = express.Router();

const sectorControllers = require('../controllers/sectorControllers');

//Tạo khu vực
router.post("/create-sector", sectorControllers.createSector)
//cập nhật
router.put("/upadate-sector/:id", sectorControllers.updateSector)
//xóa
router.delete("/delete-sector/:id", sectorControllers.deleteSector)
//lấy tất cả
router.get("/get-all-sector", sectorControllers.getAllSector)
//lấy chi tiết một khu vực
router.get("/get-detail-sector/:id", sectorControllers.getDetailSector)


module.exports = router;
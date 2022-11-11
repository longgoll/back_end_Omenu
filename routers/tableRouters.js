const express = require("express");
const router = express.Router();

const tableControllers = require('../controllers/tableControllers');

//Tạo bàn
router.post("/create-table", tableControllers.createtable)
//Cập nhật table
router.put("/update-table/:id", tableControllers.updateTable)
//Xóa table
router.delete("/delete-table/:id", tableControllers.deleteTable)
//Đọc tất cả bàn
router.get("/get-all-table", tableControllers.getAllTable)
//Đọc chi tiết bàn
router.get("/get-detail-table/:id", tableControllers.getDetailTable)
//lấy table theo khu vực
router.post("/get-all-table-by-secter", tableControllers.getAllTableBySecter)
//lấy table có khách
router.get("/get-all-table-status-t", tableControllers.StatusTableTrue)
//lấy table theo khu vực có khách
router.post("/get-all-table-by-secter-t", tableControllers.getAllTableBySecterTrue)
//lấy table không khách
router.get("/get-all-table-status-f", tableControllers.StatusTablefalse)
//lấy table theo khu vực không có khách
router.post("/get-all-table-by-secter-t", tableControllers.getAllTableBySecterfalse)
//đọc tất cả các bàn full data
router.get("/get-all-table-full-data", tableControllers.getAllTableAndData)
////đọc tất cả các bàn full data có khách
router.get("/get-all-table-full-data-t", tableControllers.getAllTableAndDataTrue)
//lấy table theo khu vực full data
router.post("/get-all-table-by-secter-full-data", tableControllers.getAllTableBySecterFullData)
//lấy table theo khu vực full data và có khách
router.post("/get-all-table-by-secter-full-data-t", tableControllers.getAllTableBySecterFullDataTrue)
//lấy chi tiết một bàn theo tableNumberId và full data
router.post("/get-detail-table-by-idnumber-f", tableControllers.getdetailTableByIDNumberFullData)

module.exports = router;
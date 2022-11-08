const express = require("express");
const router = express.Router();

const categoryFooodControllers = require('../controllers/categoryFooodControllers')

//Tạo danh mục
router.post("/create-category", categoryFooodControllers.createCategory);
//cập nhật danh mục
router.put("/update-category/:id", categoryFooodControllers.updateCategory);
//xóa danh mục
router.delete("/delete-category/:id", categoryFooodControllers.deleteCategory);
//đọc tất cả
router.get("/get-all-category", categoryFooodControllers.getAllCategory);
//đọc chi tiết
router.get("/get-detail-category/:id", categoryFooodControllers.getDetailCategory);

module.exports = router;

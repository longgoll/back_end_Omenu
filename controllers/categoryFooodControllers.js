//models
const CategoryFoodModule = require("../models/categoryFooodModules");

const categoryFooodControllers = {
  //tạo danh mục đồ ăn
  createCategory: async (req, res) => {
    const { IndexCategory, categoryName } = req.body;

    if (!IndexCategory) {
      return res.status(401).json({ message: "Vui lòng điền số thứ tự" });
    }

    if (!categoryName) {
      return res.status(401).json({ message: "Vui lòng điền tên danh mục" });
    }

    try {
      //đọc dữ liệu từ DB
      const dataCheck = await CategoryFoodModule.find({
        $or: [
          { IndexCategory: { $eq: IndexCategory } },
          { categoryName: { $eq: categoryName } },
        ],
      }).count();
      //check có tồn tại không
      if (dataCheck > 0) {
        return res
          .status(401)
          .json({ message: "Tên danh mục hoặc số thứ tự đã tồn tại" });
      }
      //tạo id
      const numberID = new Date().getTime();
      const data = await CategoryFoodModule({
        IndexCategory,
        categoryName,
        IDnumber: numberID,
      });

      await data.save();

      return res.status(200).json({ message: "Tạo thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //cập nhật danh mục
  updateCategory: async (req, res) => {
    const ID = req.params.id;
    const { IndexCategory, categoryName } = req.body;

    try {
      //đọc dữ liệu từ DB
      const dataCheck = await CategoryFoodModule.find({
        $or: [
          { IndexCategory: { $eq: IndexCategory } },
          { categoryName: { $eq: categoryName } },
        ],
      }).count();
      //check có tồn tại không
      if (dataCheck > 1) {
        return res
          .status(401)
          .json({ message: "Tên danh mục hoặc số thứ tự đã tồn tại" });
      }

      await CategoryFoodModule.findByIdAndUpdate(
        { _id: ID },
        { IndexCategory, categoryName }
      );

      return res.json({ message: "Cập nhật thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //Xóa danh mục
  deleteCategory: async (req, res) => {
    const ID = req.params.id;

    try {
      await CategoryFoodModule.findByIdAndDelete({ _id: ID });

      return res.json({ message: "Xóa thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //Đọc tất cả
  getAllCategory: async (req, res) => {
    try {
      const data = await CategoryFoodModule.find();

      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //Đọc chi tiết
  getDetailCategory: async (req, res) => {
    const ID = req.params.id;

    try {
      const data = await CategoryFoodModule.findById({ _id: ID });

      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },
};

module.exports = categoryFooodControllers;

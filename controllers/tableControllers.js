//Models
const tableModels = require("../models/tableModels");

const tableControllers = {
  //tạo bàn
  createtable: async (req, res) => {
    const { nameTable, IDnumberSector } = req.body;

    if (!nameTable) {
      return res.status(401).json({ message: "Vui lòng nhập tên bàn hoặc số" });
    }

    if (!IDnumberSector) {
      return res.status(401).json({ message: "Vui lòng chọn khu vực" });
    }

    try {
      const dataCheck = await tableModels.find({
        $and: [
          { nameTable: { $eq: nameTable } },
          { IDnumberSector: { $eq: IDnumberSector } },
        ]
      }).count();

      if (dataCheck > 0) {
        return res.status(401).json({ message: "Tên hoặc số bàn đã tồn tại" });
      }
      //tạo id
      const numberID = new Date().getTime();
      //all ok
      await tableModels({
        nameTable,
        IDnumber: numberID,
        IDnumberSector,
      }).save();

      return res.status(200).json({ message: "Tạo thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //cập nhật bàn
  updateTable: async (req, res) => {
    const ID = req.params.id;
    const { nameTable, IDnumberSector } = req.body;

    if (!nameTable) {
      return res.status(401).json({ message: "Vui lòng nhập tên bàn hoặc số" });
    }

    if (!IDnumberSector) {
      return res.status(401).json({ message: "Vui lòng chọn khu vực" });
    }

    try {
      //kiểm tra
      const dataCheck = await tableModels.find({
        $and: [
          { nameTable: { $eq: nameTable } },
          { IDnumberSector: { $eq: IDnumberSector } },
        ]
      }).count();

      if (dataCheck > 0) {
        return res.status(401).json({ message: "Tên và số bàn đã tồn tại" });
      }
      //cập nhật
      await tableModels.findByIdAndUpdate(
        { _id: ID },
        {
          nameTable,
          IDnumberSector,
        }
      );

      return res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //xóa bàn
  deleteTable: async (req, res) => {
    const ID = req.params.id;

    try {
      await tableModels.findByIdAndDelete({ _id: ID });

      return res.status(200).json({ message: "Xoá thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //đọc tất cả các bàn
  getAllTable: async (req, res) => {
    try {
      const data = await tableModels.find();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //Đọc chi tiết bàn
  getDetailTable: async (req, res) => {
    const ID = req.params.id;

    try {
      const data = await tableModels.findById({ _id: ID });

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy tất cả chi tiết
  getAllTableBySecter: async (req, res) => {
    const { IDnumberSector } = req.body

    if (!IDnumberSector) {
      return res.status(401).json({ message: 'Vui lòng nhập ID khu vực' })
    }

    try {
      const data = await tableModels.find({ IDnumberSector });

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lọc ra bàn có khách
  StatusTableTrue: async (req, res) => {
    try {
      const data = await tableModels.find({ StatusTable: true })

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lọc ra bàn không có khách
  StatusTablefalse: async (req, res) => {
    try {
      const data = await tableModels.find({ StatusTable: false })

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy table theo khu vực có khách
  getAllTableBySecterTrue: async (req, res) => {
    const { IDnumberSector } = req.body

    if (!IDnumberSector) {
      return res.status(401).json({ message: 'Vui lòng nhập ID khu vực' })
    }

    try {
      const data = await tableModels.find({
        $and: [
          { StatusTable: { $eq: true } },
          { IDnumberSector: { $eq: IDnumberSector } },
        ]
      })

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },
  //lấy table theo khu vực không có khách
  getAllTableBySecterfalse: async (req, res) => {
    const { IDnumberSector } = req.body

    if (!IDnumberSector) {
      return res.status(401).json({ message: 'Vui lòng nhập ID khu vực' })
    }

    try {
      const data = await tableModels.find({
        $and: [
          { StatusTable: { $eq: false } },
          { IDnumberSector: { $eq: IDnumberSector } },
        ]
      })

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //đọc tất cả các bàn full data
  getAllTableAndData: async (req, res) => {
    try {
      const data = await tableModels.aggregate([
        {
          $lookup: {
            from: "sectors",
            localField: "IDnumberSector",
            foreignField: "IDnumber",
            as: "Sector",
          },
        },
        { $sort: { Sector: 1 } }
      ])
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  ////đọc tất cả các bàn full data có khách
  getAllTableAndDataTrue: async (req, res) => {
    try {
      const data = await tableModels.aggregate([
        {
          $match: { StatusTable: { $eq: true }, }
        },
        {
          $lookup: {
            from: "sectors",
            localField: "IDnumberSector",
            foreignField: "IDnumber",
            as: "Sector",
          },
        },
        { $sort: { Sector: 1 } }
      ])
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy table theo khu vực full data
  getAllTableBySecterFullData: async (req, res) => {
    const { IDnumberSector } = req.body

    if (!IDnumberSector) {
      return res.status(401).json({ message: 'Vui lòng nhập ID khu vực' })
    }

    try {
      const data = await tableModels.aggregate([
        { $match: { IDnumberSector: { $eq: IDnumberSector } } },
        {
          $lookup: {
            from: "sectors",
            localField: "IDnumberSector",
            foreignField: "IDnumber",
            as: "Sector",
          },
        },
        { $sort: { Sector: 1 } }
      ])

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy table theo khu vực full data và có khách
  getAllTableBySecterFullDataTrue: async (req, res) => {
    const { IDnumberSector } = req.body

    if (!IDnumberSector) {
      return res.status(401).json({ message: 'Vui lòng nhập ID khu vực' })
    }

    try {
      const data = await tableModels.aggregate([
        {
          $match: {
            $and: [
              {
                IDnumberSector: { $eq: IDnumberSector }
              },
              {
                StatusTable: { $eq: true }
              },

            ]
          }
        },
        {
          $lookup: {
            from: "sectors",
            localField: "IDnumberSector",
            foreignField: "IDnumber",
            as: "Sector",
          },
        },
        { $sort: { Sector: 1 } }
      ])

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  }
};

module.exports = tableControllers;

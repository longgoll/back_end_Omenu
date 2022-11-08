const sectorModels = require('../models/sectorModels')

const sectorControllers = {
    //tạo khu vực
    createSector: async (req, res) => {
        const { SectorName } = req.body

        if (!SectorName) {
            return res.status(401).json({ message: 'Vui lòng nhập tên khu vực' })
        }

        try {
            //tạo id
            const numberID = new Date().getTime();
            const data = await sectorModels({
                SectorName,
                IDnumber: numberID,
            }).save()

            return res.status(200).json({ message: 'Tạo khu vực thành công' })
        } catch (error) {
            return res.status(200).json({ message: 'Vui lòng thử lại sau' })
        }
    },

    //cập nhât
    updateSector: async (req, res) => {
        const ID = req.params.id
        const { SectorName } = req.body

        if(!SectorName) {
            return res.status(401).json({message: 'Vui lòng nhập tên khu vực'})
        }

        try {
            await sectorModels.findByIdAndUpdate({ _id: ID }, { SectorName })

            return res.status(200).json({ message: 'Cập nhật thành công' })
        } catch (error) {
            return res.status(200).json({ message: 'Vui lòng thử lại sau' })
        }
    },

    //xóa
    deleteSector: async (req, res) => {
        const ID = req.params.id

        try {
            await sectorModels.findByIdAndDelete({ _id: ID })

            return res.status(200).json({ message: 'Xóa thành công' })
        } catch (error) {
            return res.status(200).json({ message: 'Vui lòng thử lại sau' })
        }
    },

    //lấy tất cả
    getAllSector: async (req, res) => {
        try {
            const data = await sectorModels.find()

            return res.status(200).json({ data })
        } catch (error) {
            return res.status(200).json({ message: 'Vui lòng thử lại sau' })
        }
    },

    //lấy chi tiết một khu vực
    getDetailSector: async (req, res) => {
        const ID = req.params.id

        try {
            const data = await sectorModels.findById({ _id: ID })

            return res.status(200).json({ data })
        } catch (error) {
            return res.status(200).json({ message: 'Vui lòng thử lại sau' })
        }
    }
}

module.exports = sectorControllers
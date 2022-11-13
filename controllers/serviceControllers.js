const kitchenModule = require('../models/kitchenModels')

const serviceControllers = {
    //lấy tất cả danh sách chờ phục vụ
    getAllWaitingService: async (req, res) => {
        try {
            // const data = await kitchenModule.find({ service: false })
            const data = await kitchenModule.aggregate([
                {
                    $match: { service: { $eq: false }, }
                },
                {
                    $lookup: {
                        from: "tables",
                        localField: "tableNumberID",
                        foreignField: "IDnumber",
                        as: "Table",
                    },
                },
                {
                    $lookup: {
                      from: "sectors",
                      localField: "Table.IDnumberSector",
                      foreignField: "IDnumber",
                      as: "Sector",
                    },
                  },
            ]);

            return res.status(200).json({ data })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },

    //lấy tất cả danh sách đã phục vụ
    getAllServiced: async (req, res) => {
        try {
            const data = await kitchenModule.aggregate([
                {
                    $match: { service: { $eq: true }, }
                },
                {
                    $lookup: {
                        from: "tables",
                        localField: "tableNumberID",
                        foreignField: "IDnumber",
                        as: "Table",
                    },
                },
                {
                    $lookup: {
                      from: "sectors",
                      localField: "Table.IDnumberSector",
                      foreignField: "IDnumber",
                      as: "Sector",
                    },
                  },
            ]);

            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },

    //xác nhận đẫ phục vụ
    changeServiced: async (req, res) => {
        const { id } = req.body
        const io = req.io

        try {
            await kitchenModule.findByIdAndUpdate({ _id: id }, { service: true })

            io.emit('OrderComplete', { status: 'OrderComplete' })
            return res.status(200).json({ message: 'Nhận đơn phục vụ thành công' })
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    }
}

module.exports = serviceControllers
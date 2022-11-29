//jwt
var jwt = require('jsonwebtoken')
const authModel = require('../models/authModel')

const middlewareCntroller = {

    //verifyToken
    verifyToken: async (req, res, next) => {
        const token = req.headers.token
        // const langIndex = req.lang

        if (!token) {
            return res.status(401).json({ success: false, message:  'Chúng tôi không thể xác thực 1'})
        }

        //Bearer
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.ACCESSTOKEN_MK, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Chúng tôi không thể xác thực 2' })
            }
            req.user = user

            authModel.findOne({ _id: req.user._id }).then(data => {
                if (!data) {
                    return res.status(401).json({ success: false, message: 'Chúng tôi không thể xác thực 3' })
                }

                next()
            }).catch(err => {
                return res.status(501).json({ success: false, message: 'Vui lòng thử lại sau' })
            })
        })
    },

    //===============

    //veriffyToken Admin
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareCntroller.verifyToken(req, res, () => {
            if (req.user.role == 'admin') {
                next()
            }
            else {
                return res.status(403).json({ success: false, message: "Bạn không đủ quyền" })
            }
        })
    },

    //veriffyToken QA manager
    verifyTokenAndQAAuth: (req, res, next) => {
        middlewareCntroller.verifyToken(req, res, () => {
            if (req.user.role == 'admin' || req.user.role == 'qa') {
                next()
            }
            else {
                return res.status(403).json({ success: false, message: "You're not allowed" })
            }
        })
    },

    //veriffyToken Staff
    verifyTokenAndStaffAuth: (req, res, next) => {
        middlewareCntroller.verifyToken(req, res, () => {
            if (req.user.role == 'qa' || req.user.role == 'admin' || req.user.role == 'staff') {
                next()
            }
            else {
                return res.status(403).json({ success: false, message: "You're not allowed" })
            }
        })
    }
}

module.exports = middlewareCntroller
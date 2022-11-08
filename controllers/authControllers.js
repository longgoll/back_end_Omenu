//hash password
const argon2 = require("argon2");

//jwt
var jwt = require("jsonwebtoken");

//DB models
const AuthModule = require("../models/authModel");

//Đăng kí Admin
const authController = {
  registerAccount: async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    if (!password) {
      return res.status(400).json({
        message: "Vui lòng nhập mật khẩu",
      });
    }

    //check email
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      return res.status(400).json({ message: "Không đúng định dạng email" });
    }

    //check pass
    if (password.length < 8) {
      return res.status(400).json({
        message: "Mật khẩu phải trên 8 ký tự",
      });
    }

    try {
      //kiểm tra tài khoản có tồn tại không
      const User = await AuthModule.findOne({ email }).count();

      if (User > 0) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại" });
      }
      //Tao mã sác thực 2 lớp
      // Create temporary secret until it it verified
      const temp_secret = speakeasy.generateSecret();
      // Send user id and base32 key to user
      var url = speakeasy.otpauthURL({
        secret: temp_secret.ascii,
        label: email,
        issuer: "OHR",
      });

      //All ok
      const hashPassword = await argon2.hash(password);
      const newUser = new AuthModule({
        email,
        password: hashPassword,
        role,
        Name,
        // islock,
        secret: {
          ascii: temp_secret.ascii,
          hex: temp_secret.hex,
          base32: temp_secret.base32,
          otpauth_url: url,
        },
      });
      //luu vao DB
      await newUser.save();

      return res.status(201).json({ message: "Tạo thành công" });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //đăng kí tài khoản cho nhân viên
  createStaff: async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({messgae: 'Vui lòng thử lại sau'})
    }
  }
};

module.exports = authController;

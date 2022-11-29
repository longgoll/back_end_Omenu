//hash password
const argon2 = require("argon2");

//jwt
var jwt = require("jsonwebtoken");
//2FW
const speakeasy = require("speakeasy");
//DB models
const AuthModule = require("../models/authModel");

//Đăng kí Admin
const authController = {

  //tao access token
  generateAccessToken: (user) => {
    return jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.ACCESSTOKEN_MK,
      { expiresIn: "1d" }
    );
  },

  //tao refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESTOKEN_MK,
      { expiresIn: "1d" }
    );
  },

  //đăng ký
  registerAccount: async (req, res) => {
    const { email, password, role, Name } = req.body;

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
      console.log(error);
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //đăng kí tài khoản cho nhân viên
  createStaff: async (req, res) => {
    try {

    } catch (error) {
      return res.status(500).json({ messgae: 'Vui lòng thử lại sau' })
    }
  },

  //đăng nhập
  loginAccount: async (req, res) => {
    // console.log('co ');
    const { email, password } = req.body;
    // const langIndex = req.lang

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng nhập email" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "vui lòng nhập mật khẩu" });
    }

    //check email
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      return res
        .status(400)
        .json({ success: false, message: "Email không hợp lệ" });
    }

    //check pass
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không hợp lệ" });
    }

    try {
      //kiểm tra tài khoản có tồn tại không
      const user = await AuthModule.findOne({ email });
      // console.log(user.password);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Kiểm tra lại tài khoản và mật khẩu",
        });
      }
      //kiem tra password
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Kiểm tra lại tài khoản và mật khẩu",
        });
      }
      //All good
      const accessToken = await authController.generateAccessToken(user);
      const refreshToken = await authController.generateRefreshToken(user);


      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Thử lại sau" });
    }
  },

  //send role
  sendRole: async (req, res) => {
    try {
      return res
        .status(200)
        .json({ success: true, role: req.user.role, UserID: req.user._id });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: vi.message_error });
    }
  },

  //xac thuc dang nhap
  accuracylogin: async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Chúng tôi không thể xác thực",
      });
    }

    //Bearer
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESSTOKEN_MK, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Chúng tôi không thể xác thực",
        });
      }

      return res.status(200).json({ message: "xac thuc success" });
    });
  },

  //lấy tất cả tài khoản
  GetAllAccount: async (req, res) => {
    try {
      const data = await AuthModule.find()

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json({ messgae: 'Vui lòng thử lại sau' })
    }
  },

  //khóa tài khoản
  LockAccount: async (req, res) => {
    const { ID, islock } = req.body

    try {
      await AuthModule.findByIdAndUpdate({ _id: ID }, { islock })

      return res.status(200).json({ message: 'Cập nhật thành công' })
    } catch (error) {
      return res.status(500).json({ messgae: 'Vui lòng thử lại sau' })
    }
  },

  //ResetAccount
  ResetAccount: async (req, res) => {
    const { ID } = req.body

    try {
      const hashPassword = await argon2.hash('12345678');
      await AuthModule.findByIdAndUpdate({_id:ID}, {password: hashPassword})

      return res.status(200).json({ message: 'Khôi phục thành công pass: 12345678' })
    } catch (error) {
      return res.status(500).json({ messgae: 'Vui lòng thử lại sau' })
    }
  },

  //delete account
  DeleteAccount: async (req, res) => {
    const { ID } = req.body
    
    try {
      await AuthModule.findByIdAndDelete({_id: ID})

      return res.status(200).json({ message: 'Xóa thành công' })
    } catch (error) {
      return res.status(500).json({ messgae: 'Vui lòng thử lại sau' })
    }
  }
};

module.exports = authController;

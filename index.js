const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require('compression')
const os = require('os')

//Routers
const authRouter = require("./routers/authRouter");
const categoryFooodRouters = require("./routers/categoryFooodRouters");
const foodRouters = require("./routers/foodRouters");
const tableRouters = require("./routers/tableRouters");
const orderRouters = require("./routers/orderRouters");
const sectorRouters = require("./routers/sectorRouters");
const kitchenRouter = require("./routers/kitchenRouter");
const serviceRouters = require("./routers/serviceRouters");

dotenv.config();

//conet DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();
//===============================================================
const app = express();
//
app.use(cookieParser());
//io
const http = require("http");
const { Server } = require("socket.io");
//
const cors = require("cors");
const { filter } = require("compression");
app.use(cors());
//socket
const server = http.createServer(app);
//
app.use(compression({
  level: 6,
  threshold: 100 * 1000,
  filter: (req, res) => {
    if (req.headers['x-no-compress']) {
      return false;
    }
    return compression.filter(req, res)
  }
}))
//
process.env.UV_THREADPOOL_SIZE = os.cpus().length*0.7

module.exports = io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

io.on("connection", (socket) => {
  //   socket.id = "dawdhiuahidawd"+1;
  // console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    // console.log("ngat ket noi: " + socket.id);
  });
});

//Run Router
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use("/api/v1", authRouter);
app.use("/api/v1", categoryFooodRouters);
app.use("/api/v1", foodRouters);
app.use("/api/v1", tableRouters);
app.use("/api/v1", orderRouters);
app.use("/api/v1", sectorRouters);
app.use("/api/v1", kitchenRouter);
app.use("/api/v1", serviceRouters);

//===============================================================
server.listen(process.env.PORT || process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});

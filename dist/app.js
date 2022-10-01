"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { connectDb } = require("./database/db");
connectDb();
const { errorHandler } = require("./middlewares/errorHandler");
const ordersRouter = require("./routes/orders.route");
const app = (0, express_1.default)();
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/api/order", ordersRouter);
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).json({
        message: "Invalid route",
    });
    next();
});
exports.default = app;

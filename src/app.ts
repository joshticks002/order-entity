import express, { Request, Response, NextFunction, Application } from "express";
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { connectDb } = require("./database/db");
connectDb();
const { errorHandler } = require("./middlewares/errorHandler");
const ordersRouter = require("./routes/orders.route");

const app: Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/order", ordersRouter);
app.use(errorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Invalid route",
  });
  next();
});

export default app;

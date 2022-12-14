import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import HTTP_STATUS_CODE from "../constant/http-codes"

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    error: err.message,
    data: [],
    statusCode,
  });
};

module.exports = {
  errorHandler,
};

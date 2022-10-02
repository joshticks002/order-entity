"use strict";
const express = require("express");
const router = express.Router();
const { getOrderDetails, createOrder, getOrders, seedOrders } = require("../controllers/orders.controller");
const { validateOrder } = require("../middlewares/order_validation");
router.get("/", getOrders);
router.post("/", validateOrder, createOrder);
router.get("/:orderid", getOrderDetails);
module.exports = router;

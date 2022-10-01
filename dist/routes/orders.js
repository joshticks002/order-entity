"use strict";
const express = require("express");
const router = express.Router();
const { getOrderDetails, createOrder, seedOrders } = require("../controllers/orders.controller");
const { validateOrder } = require("../middlewares/order_validation");
router.get("/:orderid", getOrderDetails);
router.post("/", validateOrder, createOrder);
module.exports = router;
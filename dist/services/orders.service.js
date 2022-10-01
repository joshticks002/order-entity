"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderService = require("../models/orders.model");
const BranchModel = require("./branch.service");
const allOrders = async () => {
    const orders = await OrderService.find();
    return orders;
};
const orderById = async (id, res) => {
    const existing = await OrderService.findOne({ order_id: id });
    if (!existing) {
        res.status(404);
        throw new Error("failed");
    }
    const branch = await BranchModel.singleBranch(existing.branch_id);
    const order = {
        item_type: existing.item_type,
        item_price: existing.item_price,
        branch_id: branch.place_id,
        order_state: existing.order_state,
        item_quantity: existing.item_quantity,
        total_amount: existing.total_amount,
        customer_id: existing.customer_id,
        updated_at: existing.updated_at,
    };
    return order;
};
const createNewOrder = async (data) => {
    const newOrder = await OrderService.create(data);
    return newOrder.order_id;
};
module.exports = { allOrders, orderById, createNewOrder };

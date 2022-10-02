"use strict";
const orders = require("mongoose");
const ordersSchema = orders.Schema({
    item_type: {
        type: String,
        required: [true],
    },
    order_state: {
        type: String,
        required: [true],
    },
    updated_at: {
        type: String,
        required: [true],
    },
    branch_id: {
        type: orders.Schema.Types.ObjectId,
        ref: "branch",
    },
    customer_id: {
        type: String,
        required: [true],
    },
    order_id: {
        type: Number,
        required: [true],
        unique: true,
    },
    quantity: {
        type: Number,
        required: [true],
    },
    item_price: {
        type: Number,
        required: [true],
    },
    total_amount: {
        type: Number,
        required: [true],
    },
});
module.exports = orders.model("orders", ordersSchema);

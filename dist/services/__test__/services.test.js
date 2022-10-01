"use strict";
const { connectDB, disconnectDB } = require("../../../in_memory/dbsetup");
const BranchModel = require("../branch.service");
const OrderModel = require("../orders.service");
describe("Helper functions", () => {
    beforeAll(async () => {
        await connectDB();
    });
    afterAll(async () => {
        await disconnectDB();
    });
    let branchId = "object_id";
    const order = {
        item_type: "Cake",
        order_state: "Shipped",
        updated_at: "9/20/2022, 2:10:30 PM",
        branch_id: branchId,
        customer_id: "fe38920-4",
        order_id: 1,
        quantity: 10,
        item_price: 500,
        total_amount: 5000,
    };
    const branch1 = { place_id: 1 };
    test("should create a branch", async () => {
        const createdBranch = await BranchModel.createNewBranch(branch1);
        expect(createdBranch).not.toBe(null);
        expect(createdBranch).toBeTruthy();
    });
    test("should create an order", async () => {
        const allBranch = await BranchModel.allBranch();
        order.branch_id = allBranch[0]._id;
        const createdOrder = await OrderModel.createNewOrder(order);
        expect(createdOrder).not.toBe(null);
        expect(createdOrder).toBeTruthy();
    });
    test("should return all orders", async () => {
        const allOrders = await OrderModel.allOrders();
        expect(allOrders).not.toBe(null);
        expect(allOrders).toBeTruthy();
    });
    test("should return all branch", async () => {
        const allBranch = await BranchModel.allBranch();
        expect(allBranch).not.toBe(null);
        expect(allBranch).toBeTruthy();
    });
    test("should find order by order id", async () => {
        const orderExist = await OrderModel.orderById(order.order_id);
        expect(orderExist).toBeTruthy();
        expect(() => orderExist).not.toThrow(Error);
    });
});

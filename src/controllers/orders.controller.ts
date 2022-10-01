import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");
const OrderModel = require("../services/orders.service");
const BranchModel = require("../services/branch.service");
const uuidv1 = require("uuid");

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { quantity, item_price } = req.body as Order;
  const customer = uuidv1.v1().substr(0, 10).padStart("0", 10);
  const allOrders = await OrderModel.allOrders();

  req.body.customer_id = customer;
  req.body.total_amount = quantity * item_price;
  req.body.updated_at = new Date();
  req.body.order_id = allOrders.length + 1;

  const order = await OrderModel.createNewOrder(req.body);

  res.status(201).json({
    message: "Done",
    data: order,
    statusCode: 201,
  });
});

const getOrderDetails = asyncHandler(async (req: Request, res: Response) => {
  const allOrders = await OrderModel.orderById(req.params.orderid, res);

  res.status(200).json({
    message: "Fetched",
    data: allOrders,
    statusCode: 200,
  });
});

const seedBranch = asyncHandler(async (req: Request, res: Response) => {
  for (let i = 1; i <= 1000; i++) {
    const branch = { place_id: i };
    await BranchModel.createNewBranch(branch);
  }
  res.status(201).json({
    message: "Branch seeding completed",
    data: [],
    statusCode: 201,
  });
});

const seedOrders = asyncHandler(async (req: Request, res: Response) => {
  const item = [
    { name: "Cake", price: 500 },
    { name: "Cookies", price: 50 },
    { name: "Muffins", price: 100 },
  ];
  const state = ["Created", "Shipped", "Delivered", "Canceled"];

  function convertTZ(date: string, tzString: string) {
    return new Date(date).toLocaleString('en-US', { timeZone: tzString });
  }

  for (let i = 1; i <= 450; i++) {
    const customer = uuidv1.v1().substr(0, 10).padStart("0", 8);
    const randomItem = item[Math.floor(Math.random() * 3)];
    const randomState = state[Math.floor(Math.random() * 4)];
    const itemQuantity = Math.floor(Math.random() * 200);
    const branch = await BranchModel.branchForSeeding(
      Math.ceil(Math.random() * 1000)
    );
    const currentTime = convertTZ("2022/09/26 18:05:45 +0000", "Indian/Mahe");

    const order: Order = {
      item_type: randomItem.name,
      order_state: randomState,
      updated_at: currentTime,
      branch_id: branch.id,
      order_id: i,
      item_price: randomItem.price,
      quantity: itemQuantity,
      total_amount: itemQuantity * randomItem.price,
      customer_id: customer,
    };

    await OrderModel.createNewOrder(order);
  }

  res.status(201).json({
    message: "Orders seeding Completed",
    data: [],
    statusCode: 201,
  });
});

module.exports = {
  getOrderDetails,
  createOrder,
};

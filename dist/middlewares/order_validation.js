"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validateOrder = async (req, res, next) => {
    try {
        const Schema = Joi.object({
            item_type: Joi.string().valid("Cake", "Cookies", "Muffins").required(),
            item_price: Joi.number().required(),
            order_state: Joi.string()
                .valid("Created", "Shipped", "Delivered", "Canceled")
                .required(),
            branch_id: Joi.string().required(),
            quantity: Joi.number().required(),
        });
        await Schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        res.status(400).json({ error: "Bad request", data: [], statusCode: 400 });
    }
};
module.exports = { validateOrder };

"use strict";
const BranchService = require("../models/branch.model");
const allBranch = async () => {
    const allBrch = await BranchService.find();
    return allBrch;
};
const singleBranch = async (id) => {
    const singleBrch = await BranchService.findOne({ _id: id });
    return singleBrch.place_id;
};
const createNewBranch = async (data) => {
    const newBranch = await BranchService.create(data);
    return newBranch;
};
const branchForSeeding = async (id) => {
    const singleBrch = await BranchService.findOne({ place_id: id });
    return singleBrch;
};
module.exports = { allBranch, singleBranch, createNewBranch, branchForSeeding };

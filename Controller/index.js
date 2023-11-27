const promotorController = require("./promotor")
const accountDetailController = require("./accountDetail");
const authsController = require("./auths");
const categoryController = require("./category");
const eventController = require("./event");
const cityController = require("./city");
const transactionController = require("./transaction")
module.exports ={
    accountDetailController,
    authsController,
    eventController,
    categoryController,
    cityController,
    promotorController,
    transactionController,
};


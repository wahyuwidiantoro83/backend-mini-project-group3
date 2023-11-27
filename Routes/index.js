const promotorRouter = require("./promotor")
const eventRouter = require("./event");
const categoryRouter = require("./category");
const cityRouter = require("./city");
const authRouter = require("./auth");
const accountDetailRouter = require("./accountDetail")

module.exports = { eventRouter, categoryRouter, cityRouter, authRouter,accountDetailRouter,promotorRouter };


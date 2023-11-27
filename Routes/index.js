const promotorRouter = require("./promotor")
const eventRouter = require("./event");
const categoryRouter = require("./category");
const cityRouter = require("./city");
const authsRouter = require("./auths");
const accountDetailRouter = require("./accountDetail")

module.exports = { eventRouter, categoryRouter, cityRouter, authsRouter,accountDetailRouter,promotorRouter };


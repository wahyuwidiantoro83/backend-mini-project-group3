const router = require("express").Router();
const { eventController } = require("../Controller");

router.get("/", eventController.getEvent);

module.exports = router;

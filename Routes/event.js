const router = require("express").Router();
const { eventController } = require("../Controller");

router.get("/", eventController.getEvent);
router.get("/detail/:id", eventController.getEventDetail);

module.exports = router;

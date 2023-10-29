const { getDataEvent } = require("../Controller/EventController");
const router = require("express").Router();

router.get("/", getDataEvent);

module.exports = router;

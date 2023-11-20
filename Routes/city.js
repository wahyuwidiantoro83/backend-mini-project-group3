const { cityController } = require("../Controller");
const router = require("express").Router();

router.get("/", cityController.getCity);

module.exports = router;

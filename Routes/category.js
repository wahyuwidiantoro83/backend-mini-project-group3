const { categoryController } = require("../Controller");
const router = require("express").Router();

router.get("/", categoryController.getCategory);

module.exports = router;

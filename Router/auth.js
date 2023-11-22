const router = require("express").Router()
const { authController } = require("../Controller");

router.post("/regis", authController.register);
router.get("/verify", authController.verifyAccount);


module.exports = router
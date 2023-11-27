const router = require("express").Router()
const { authController } = require("../Controller");
const {validateToken} = require("../middleware/validation")

router.post("/regis",  authController.register);
router.post("/verify", validateToken, authController.verifyAccount);
router.post("/login", validateToken, authController.login)


module.exports = router
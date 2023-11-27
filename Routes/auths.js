const router = require("express").Router()
const { authsController } = require("../Controller");
const {validateToken} = require("../middleware/validation")

router.post("/regis",  authsController.register);
router.post("/verify", validateToken, authsController.verifyAccount);
router.post("/login", validateToken, authsController.login)


module.exports = router;

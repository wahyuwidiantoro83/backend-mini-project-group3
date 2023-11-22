const router = require("express").Router()
const { accountDetailController } = require("../Controller");
const {uploader} = require("../Helper/uploader")

router.post("/registrasi",  accountDetailController.completeProfile);


module.exports = router;
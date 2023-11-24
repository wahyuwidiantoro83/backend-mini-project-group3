const router = require("express").Router();
const { accountDetailController } = require("../Controller");
const { uploader } = require("../Helper/uploader");
const { validateToken } = require("../middleware/validation");

router.post(
  "/registrasi",
  validateToken,
  uploader("/document").single("fileUpload"),
  accountDetailController.completeProfile
);

module.exports = router;

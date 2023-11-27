const router = require("express").Router();
const { accountDetailController } = require("../Controller");
const { uploader } = require("../Helper/uploader");
const { validateToken } = require("../middleware/validation");

router.post(
  "/registrasi",
  validateToken,
  accountDetailController.completeProfile
);
router.patch("/update/:id", validateToken, accountDetailController.updateAccountDetail)

module.exports = router;

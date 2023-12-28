const { promotorController } = require("../Controller");
const { uploader } = require("../Helper/uploader");
const { validateToken } = require("../middleware/validation");
const router = require("express").Router();

// Promotor Publish
router.post("/publish", validateToken, promotorController.publish);

// Routing untuk landing login promotor
// router.post("/", promotorController.dummyLogin);

// Routing untuk manage event
router.get("/manage-event", validateToken, promotorController.getPromotorEvent);
router.patch("/manage-event", validateToken, promotorController.editPromotorEvent);
router.delete("/manage-event/:id", validateToken, promotorController.deletePromotorEvent);

// Routing untuk create event
router.post("/create-event", promotorController.publish);

// Routing untuk  mendapatkan category
// router.get("/get-category",promotorController.getCategory)

// Routing untuk upload image ke server
router.post("/create/event", uploader("/event_image").single("fileUpload"));

module.exports = router;

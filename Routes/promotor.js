const {promotorController} = require("../Controller");
const {uploader} = require("../Helper/uploader");
const { validateTokenPromotor } = require("../middleware/validatePromotor");
const router = require("express").Router();

// Promotor Publish
router.post("/publish",promotorController.publish)


// Routing untuk landing login promotor
router.get("/", promotorController.getDataEvent)

// Routing untuk manage event
router.get("/manage-event", promotorController.getPromotorEvent)
router.patch("/manage-event", promotorController.editPromotorEvent)
router.delete("/manage-event", promotorController.deletePromotorEvent)

// Routing untuk create event
router.post("/create-event",
)

// Routing untuk upload image ke server
router.post("/create/event",uploader("/event_image").single("fileUpload"))

module.exports = router;

const { getDataEvent, getPromotorEvent, postPromotorEvent, editPromotorEvent, deletePromotorEvent, getPromotorTicket, editPromotorTicket, deletePromotorTicket } = require("../Controller/PromotorController");

const router = require("express").Router();

router.get("/", getDataEvent)
router.get("/manage", getPromotorEvent)
router.patch("/manage", editPromotorEvent)
router.delete("/manage", deletePromotorEvent)
router.post("/manage/create", postPromotorEvent)
router.get("/ticket", getPromotorTicket)
router.patch("/ticket", editPromotorTicket)
router.delete("/ticket", deletePromotorTicket)


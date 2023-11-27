const router = require("express").Router();
const { transactionController } = require("../Controller/transaction");
const { validateToken } = require("../middleware/validation");

router.post("/create-transaction", validateToken, transactionController.createTransaction);

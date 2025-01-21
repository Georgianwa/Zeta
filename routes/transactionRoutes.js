const express = require("express");
const { initiateTransaction, getTransactions, getTransactionbyId, updateTransaction, deleteTransaction } = require("../controllers/transactionControllers");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/transactions", initiateTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionbyId);
router.put("/transactions/:id", auth, updateTransaction);
router.delete("/transactions/:id", auth, deleteTransaction);

module.exports = router;
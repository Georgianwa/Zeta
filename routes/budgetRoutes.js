const express = require("express");
const { createBudget, getBudgets, getBudgetbyId, updateBudget, deleteBudget } = require("../controllers/budgetControllers");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/budgets", createBudget);
router.get("/budgets", getBudget);
router.get("/budgets/:id",  auth, getBudgetbyId);
router.put("/budgets/:id", auth, updateBudget);
router.delete("/budgets/:id", auth, deleteBudget);

module.exports = router;
const express = require("express");
const { createUser, loginUser, getUser, updateUser, deleteUser } = require("../services/userService");

const router = express.Router();

router.get("/insights/summary", getBudget);
router.get("/insights/monthly", getBudgetMonthly);

module.exports = router;
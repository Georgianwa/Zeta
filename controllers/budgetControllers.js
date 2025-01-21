const mongoose = require("mongoose");
const Budget = require("../models/budgetModel");

exports.createBudget = async (req, res) => {
    try {
        const { title, amount, duration, description } = req.body;
        const budget = new Budget({
            title,
            amount,
            duration,
            description,
            user: req.user.id
        });
        await budget.save();
        res.status(201).json(budget);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ user: req.user.id });
        res.status(200).json(budgets);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.getBudgetById = async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget || budget.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json(budget);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const budget = await Budget.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!budget) return res.status(404).json({ message: "Budget not found" });
        res.status(200).json(budget);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.deleteBudget = async (req, res) => {
    try {
        const budget = await Budget.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!budget) return res.status(404).json({ message: "Budget not found" });
        res.status(200).json({ message: "Budget deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};


exports.getFinancialSummary = async (req, res) => {
    try {
        const userId = req.user.id;

        const transactions = await Transaction.find({ user: userId });
        const totalIncome = transactions
            .filter((tx) => tx.type === "income")
            .reduce((acc, tx) => acc + tx.amount, 0);
        const totalExpenses = transactions
            .filter((tx) => tx.type === "expense")
            .reduce((acc, tx) => acc + tx.amount, 0);


        const budgets = await Budget.find({ user: userId });
        const remainingBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0) - totalExpenses;


        const categoryTotals = {};
        transactions.forEach((tx) => {
            if (tx.type === "expense") {
                categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
            }
        });

        const topCategories = Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([category, total]) => ({ category, total }));

        res.status(200).json({
            totalIncome,
            totalExpenses,
            remainingBudget,
            topCategories
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};


exports.getMonthlyBreakdown = async (req, res) => {
    try {
        const userId = req.user.id;
        const year = req.query.year || new Date().getFullYear();

        const transactions = await Transaction.find({ user: userId });
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: index + 1,
            income: 0,
            expenses: 0
        }));

        transactions.forEach((tx) => {
            const month = new Date(tx.date).getMonth();
            if (tx.type === "income") {
                monthlyData[month].income += tx.amount;
            } else if (tx.type === "expense") {
                monthlyData[month].expenses += tx.amount;
            }
        });

        res.status(200).json(monthlyData);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};


const mongoose = require("mongoose");
const Transaction = require("../models/transactionModel");


exports.initiateTransaction = async (req, res) => {
    try {
        const { amount, category, recipient, narration, budget } = req.body;
        const transaction = new Transaction({
            amount,
            category,
            recipient,
            narration,
            budget,
            user: req.user.id
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Internal server error occurred" });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { startDate, endDate, budget, search, category, recipient } = req.query;
        const filter = { user: req.user.id };

        if (search) {
            filter.$or = [
                { category: { $regex: search, $options: "i" } },
                { recipient: { $regex: search, $options: "i" } },
                { narration: { $regex: search, $options: "i" } }
            ];
        }

        if (category) filter.category = category;
        if (recipient) filter.recipient = recipient;
        if (startDate || endDate) {
            filter.transactionDate = {};
            if (startDate) filter.transactionDate.$gte = new Date(startDate);
            if (endDate) filter.transactionDate.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(filter);
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique:true
    },
    amount: { 
        type: Number,
        required: true,
        unique:true
    },
    category: { 
        type: String,
        required: true,
        min: 3,
        max: 120
    },
    recipient: { 
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    transactionDate: { 
        type: Date,
        default: Date.now
    },
    narration: { 
        type: String
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

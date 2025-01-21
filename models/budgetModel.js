const mongoose = require("mongoose");


const budgetSchema = new mongoose.Schema({
    id: {
        type: String, 
        unique:true
    },
    title: { 
        type: String,
        required: true,
        max: 200
    },
    amount: { 
        type: Number,
        required: true
    },
    duration: { 
        type: String,
        enum: ["weekly", "monthly", "yearly"],
        required: true
    },
    transactionDate: { 
        type: Date,
        default: Date.now
    },
    description: { 
        type: String,
        required: true,
        max: 1000
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;

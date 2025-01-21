const mongoose = require("mongoose");
const User = require("./models/userModel");
const dotenv = require("dotenv");
dotenv.config

async function syncUserIndexes() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await User.syncIndexes(); // Correctly calling the syncIndexes method
        console.log("User indexes synced successfully!");

        await mongoose.disconnect();
    } catch (err) {
        console.error("Error syncing indexes:", err);
    }
}

syncUserIndexes();

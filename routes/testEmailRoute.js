const express = require("express");
const transporter = require("../config/emailConfig");

const router = express.Router();

router.get("/test-email", async (req, res) => {
    try {
        const recipient = req.query.to || "uzogeorgia@gmail.com"; // Default to test email
        const mailOptions = {
            from: process.env.EMAIL_USER || "default@example.com", // Fallback if undefined
            to: recipient,
            subject: "Test Email",
            text: "This is a test email sent from Nodemailer.",
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: `Test email sent successfully to ${recipient}!` });
    } catch (error) {
        res.status(500).json({ 
            error: "Failed to send email", 
            details: error.message 
        });
    }
});

module.exports = router;

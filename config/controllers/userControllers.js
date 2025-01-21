const mongoose = require("mongoose");
const User = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const transporter = require("../config/emailConfig");
const ejs = require("ejs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, username, age, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "A user with that email already exists!" });
        }

        const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

        const user = new User({
            firstName,
            lastName,
            username,
            age,
            email,
            password: hashedPassword,
        });

        await user.save();

        const emailTemplate = path.resolve(__dirname, "../views/welcomeEmail.ejs");
        const emailContent = await ejs.renderFile(emailTemplate, { firstName });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Sign up successful!",
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "User registration successful", user });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await argon2.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedFields = { ...req.body };

        if (updatedFields.password) {
            updatedFields.password = await argon2.hash(updatedFields.password, { type: argon2.argon2id });
        }

        const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

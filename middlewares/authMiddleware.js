const express = require("express");
const { createUser, loginUser, getUser, updateUser, deleteUser } = require("../controllers/userControllers");
const jwt = require("jsonwebtoken");

const router = express.Router();


const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. Missing or invalid token." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token is invalid", details: err.message });
    }
};

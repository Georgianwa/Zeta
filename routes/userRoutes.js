const express = require("express");
const { createUser, loginUser, getUser, updateUser, deleteUser } = require("../controllers/userControllers");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUser);
router.put("/profile", auth, updateUser);
router.delete("/profile", auth, deleteUser);


module.exports = router;

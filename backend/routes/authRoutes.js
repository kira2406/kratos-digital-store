const express = require("express")
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authenticateJWT");

const router = express.Router();

// Register route
router.post("/register", authController.register)
// Login route
router.post("/login", authController.login)
// Logout route
router.post("/logout", verifyToken, authController.logout)

router.post("/verifyToken", authController.verifyToken)

module.exports = router;
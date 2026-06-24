const express = require("express");
const {
    register,
    login,
    dashboard,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", dashboard);

module.exports = router;
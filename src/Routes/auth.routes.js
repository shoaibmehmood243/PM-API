const router = require("express").Router();
const authController = require("./../Controllers/auth.controller");

router.post("/sign-up", authController.signUp)

module.exports = router;
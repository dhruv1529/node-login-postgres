const router = require("express").Router();
const login = require("../controller/authController");

router.post("/auth/login", login);

module.exports = router;

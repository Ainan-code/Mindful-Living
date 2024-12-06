const express = require("express");

const {Signup, Login, Logout} = require("../Controllers/authController");

const router =  express.Router();


router.post("/signup", Signup );

router.post("/login", Login);

router.post("/logout", Logout);


module.exports = router;

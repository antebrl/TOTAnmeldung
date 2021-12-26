const express = require("express");
const router = express.Router();
require('express-async-errors');
const middleware = require("./middleware.js");

router.post("/api", middleware.validateRegister, middleware.handleMail, (req, res, next) => {
    //Sucess
    res.status(201).json({ message: "Sucess!" });
});

module.exports = router;
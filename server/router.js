const express = require("express");
const router = express.Router();
require('express-async-errors');
const middleware = require("./middleware.js");
const Controller = require('./Controller.js');

router.post("/person", middleware.validateRegister, middleware.handleMail, (req, res, next) => {
    //Sucess
    res.status(201).json({ message: "Sucess!" });
});

router.get("/persons", async (req, res, next) => {
    const response = {
        "09:00 - 11:00": await Controller.sumPersons("09:00 - 11:00"),
        "11:30 - 13:30": await Controller.sumPersons("11:30 - 13:30"),
    } 
    res.status(200).json({timeslots: response});    
});

module.exports = router;
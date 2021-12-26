import express from "express";
const router = express.Router();
import "express-async-errors";
import {validateRegister, handleMail} from "./middleware.js";
import {sumPersons} from "./Controller.js";

router.post("/person", validateRegister, handleMail, (req, res, next) => {
    //Sucess
    res.status(201).json({ message: "Sucess!" });
});

router.get("/persons", async (req, res, next) => {
    const response = {
        "09:00 - 11:00": await sumPersons("09:00 - 11:00"),
        "11:30 - 13:30": await sumPersons("11:30 - 13:30"),
    } 
    res.status(200).json({timeslots: response});    
});

export default router;
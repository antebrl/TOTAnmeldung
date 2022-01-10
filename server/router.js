import express from "express";
const router = express.Router();
import "express-async-errors";
import {validateRegister, handleMail} from "./middleware.js";
import {sumPersons} from "./Controlles.js";
import UserModel from "./models/user.js";

router.post("/person", validateRegister, handleMail, async (req, res, next) => {
    //Sucess
    const user = new UserModel(req.body);
    await user.save((err) => {
        if(err) return res.status(500).json({ message: "<strong>Kann Sie nicht anmelden</strong>" });
    }); 
    res.status(201).json({ message: "<strong>Erfolgreich angemeldet! </strong> Sie haben eine Email erhalten" });
});

router.get("/persons", async (req, res, next) => {
    const response = {
        first: (await sumPersons("09:00-11:00") >= 255) ? true : false,
        second: (await sumPersons("11:30-13:30") >= 255) ? true : false,
        warteliste1: (await sumPersons("09:00-11:00 Warteliste") >= 55) ? true : false,
        warteliste2: (await sumPersons("11:30-13:30 Warteliste") >= 55) ? true : false,
    } 
    res.status(200).json(response);    
});

export default router;
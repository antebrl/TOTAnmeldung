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
        if(err) return res.status(500).json({ message: "Database issue!" });
    }); 
    res.status(201).json({ message: "Sucess!" });
});

router.get("/persons", async (req, res, next) => {
    const response = {
        "09:00-11:00": (await sumPersons("09:00-11:00") >= 250) ? false : true,
        "11:30-13:30": (await sumPersons("11:30-13:30") >= 250) ? false : true,
    } 
    res.status(200).json(response);    
});

export default router;
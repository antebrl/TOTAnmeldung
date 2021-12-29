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
    const persons = await UserModel.find({})
    const early = persons.filter(person => person.zeit == "09:00-11:00")
    const late = persons.filter(person => person.zeit == "11:30-13:30")

    let earlyPersons = 0
    let latePersons = 0

    Array.from(early).forEach(person => earlyPersons += person.personen)
    Array.from(late).forEach(person => latePersons += person.personen)


    const response = {
        "09:00-11:00": earlyPersons,
        "11:30-13:30": latePersons
    }
    res.status(200).send(response)
    /* comment till fixed
    const response = {
        "09:00 - 11:00": await sumPersons("09:00 - 11:00"),
        "11:30 - 13:30": await sumPersons("11:30 - 13:30"),
    } 
    */
    res.status(200).json({timeslots: response});    
});

export default router;
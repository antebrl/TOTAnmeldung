import hbs from "nodemailer-express-handlebars";
import UserModel from "./models/user.js";
import nodeMailer from "nodemailer";
import emailValidator from "deep-email-validator";
import {sumPersons} from "./Controlles.js";


export const validateRegister = async (req, res, next) => {

    if(!req.body.name) return res.status(406).json({message: "No name was given."})
    if(!req.body.vorname) return res.status(406).json({message: "No last name was given."})
    if(!req.body.email) return res.status(406).json({message: "No email was given."})
    if(!req.body.zeit) return res.status(406).json({message: "No time was given."})
    if(!req.body.personen) return res.status(406).json({message: "No dependants are given."})

    if(req.body.personen > 5) return res.status(403).json({message: "Too mandy dependants given."})
    
    if(await sumPersons(req.body.zeit) + req.body.personen >= 255) return res.status(400).json({message: "Database is full!"});

    const docsUsed = await UserModel.countDocuments({email:req.body.email});
    if(docsUsed > 0) return res.status(400).json({message: "Email already registrated!"});

    const resMailVal = await emailValidator.validate(req.body.email);
    if(!resMailVal.valid) return res.status(400).json({message: "Email is invalid"});

    next();
};

export const handleMail = async (req, res, next) => {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    transporter.use("compile", hbs({
        viewEngine: {
            extname: ".handlebars",
            partialsDir: "./server/views",
            defaultLayout: false,
        },
        viewPath: "./server/views"
    }));

    const mailOptions = {
        from: `"Tag der Offenen Tür AKG" <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: 'Anmeldebestätigung',
        template: "registerEmail",
        context: {
            name: `${req.body.vorname} ${req.body.name}`,
            time: req.body.zeit,
            dependants: req.body.personen,
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
            res.status(400).json("Email is not valid!");
        } else {
            console.log(info.response);
            next();
        }
    });
};
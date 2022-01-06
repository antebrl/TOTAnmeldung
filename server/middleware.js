import hbs from "nodemailer-express-handlebars";
import UserModel from "./models/user.js";
import nodeMailer from "nodemailer";
import {sumPersons} from "./Controlles.js";


export const validateRegister = async (req, res, next) => {

    if(!req.body.name) return res.status(406).json({message: "No last name was given."})
    if(!req.body.vorname) return res.status(406).json({message: "No name was given."})
    if(!req.body.email) return res.status(406).json({message: "No email was given."})
    if(!req.body.zeit) return res.status(406).json({message: "No time was given."})
    if(!req.body.personen) return res.status(406).json({message: "No dependants are given."})

    if(req.body.personen > 5) return res.status(403).json({message: "Bitte kommen sie mit maximal 5 Personen"})
    
    if(await sumPersons(req.body.zeit) + parseInt(req.body.personen) >= 255) return res.status(400).json({message: "<strong>Das Event ist bereits ausgebucht.</strong> <br>Versuche es später erneut"});

    const docsUsed = await UserModel.countDocuments({email:req.body.email});
    if(docsUsed > 0) return res.status(400).json({message: "<strong>Sie sind mit dieser Email bereits angemeldet!</strong> <br> Bitte überprüfen sie ihre Emails"});

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
            partialsDir: "./views",
            defaultLayout: false,
        },
        viewPath: "./views"
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
            res.status(400).json("Email ist nicht gültig!");
        } else {
            console.log(info.response);
            next();
        }
    });
};
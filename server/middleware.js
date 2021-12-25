const UserModel = require('./models/user.js');
const nodeMailer = require('nodemailer');
const emailValidator = require('deep-email-validator');

module.exports = {
    validateRegister: async (req, res, next) => {

        //const docsFull = await UserModel.countDocuments({zeit: req.body.zeit});
        const docsFull = await UserModel.aggregate([
            // Limit to relevant documents and potentially take advantage of an index
            { $match: {
                zeit: req.body.zeit
            }},
        
            { $project: {
                total: { $add: "$personen"}
            }}
        ]);
        let sum = 0;
        for(let i=docsFull.length; i--;) {
            sum+=docsFull[i].total;
        }
        if(sum+req.body.personen >= 250) return res.status(400).json({message: "Database is full!"});

        const docsUsed = await UserModel.countDocuments({email:req.body.email});
        if(docsUsed > 0) return res.status(400).json({message: "Email already registrated!"});

        const resMailVal = await emailValidator.validate(req.body.email);
        if(!resMailVal.valid) return res.status(400).json({message: "Email is invalid"});

        const user = new UserModel(req.body);
        await user.save((err) => {
            if(err) return res.status(500).json({ message: "Database issue!" });
        }); 

        next();
    },

    handleMail: async (req, res, next) => {
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Tag der Offenen Tür AKG" <${process.env.EMAIL_USER}>`,
            to: req.body.email,
            subject: 'Anmeldebestätigung',
            text: 'Ihre Anmeldung für den Tag der Offenen Tür wurde bei uns registriert: ' + req.body
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
    },

};
import html_to_pdf from "html-pdf-node";
import fs from "fs";
import Mustache from "mustache";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./models/user.js";
import {sumPersons} from "./Controlles.js";

dotenv.config();
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

const templatePdf = fs.readFileSync("./views/templatePdf.html", "utf8");
const options = { format: 'A4', path: "./pdf/ticket.pdf" };

const template = fs.readFileSync("./views/template.html", "utf8");
const AnmeldebestätigungWarte = fs.readFileSync("./views/AnmeldebestätigungWarte.html", "utf8");

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let htmlPdf, html, file, mailOptions;
const sumFirst = await sumPersons("09:00-11:00");
const sumFirstwait = await sumPersons("09:00-11:00 Warteliste");
const sumSecondwait = await sumPersons("11:30-13:30 Warteliste");
const sumSecond = await sumPersons("11:30-13:30");
console.log(sumFirst);
console.log(sumSecond);
console.log(sumFirstwait);
console.log(sumSecondwait);
/*
//Fill up from Waitlist
const sumFirst = await sumPersons("09:00-11:00");
let count = 255 - sumFirst;
console.log(count);
if(count > 1) {
    UserModel.find({zeit: "09:00-11:00 Warteliste"}, async(err, users) => {
        if(err) console.log(err);

        users.map(async(doc) => {
            if(count > 1) {
                count -= doc.personen;
                doc.zeit = "09:00-11:00";
                await doc.save();
                console.log("Warteliste removed Mail:");
                await sendMailWarte(doc);
            } else {
                return;
            }
        });
    });
}

const sumSecond = await sumPersons("11:30-13:30");
let countSecond = 255 - sumSecond;
console.log(countSecond);
if(countSecond > 1) {
    UserModel.find({zeit: "11:30-13:30 Warteliste"}, async(err, users) => {
        if(err) console.log(err);

        users.map(async(doc) => {
            if(countSecond > 1) {
                countSecond -= doc.personen;
                doc.zeit = "11:30-13:30";
                await doc.save();
                console.log("Warteliste removed Mail:");
                await sendMailWarte(doc);
            } else {
                return;
            }
        });
    });
}
*/

//send Mails
//const personFirstArr = UserModel.find({zeit: "09:00-11:00"}).cursor();
//personFirstArr.eachAsync(async person => await sendMail(person));

//const personSecondArr = UserModel.find({zeit: "11:30-13:30"}).cursor();
//personSecondArr.eachAsync(async person => await sendMail(person));

const sendMail = async (data) => {
    console.log(data.email);
    htmlPdf = Mustache.render(templatePdf, data);
    html = Mustache.render(template, data);
    file = { content: htmlPdf, name: 'ticket.pdf'};

    await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
    }).catch(err => {
        console.log(err);
    });

    mailOptions = {
        from: `"Tag der Offenen Tür AKG" <${process.env.EMAIL_USER}>`,
        to: "ahcwnh@gmail.com",
        subject: 'Ticket für Tag der offenen Tür',
        html: html,
        attachments: [{
            filename: 'ticket.pdf',
            path: './pdf/ticket.pdf',
            contentType: 'application/pdf'
        }],
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    });
};

const sendMailWarte = async (data) => {
    console.log(data.email);
    html = Mustache.render(AnmeldebestätigungWarte, data);

    mailOptions = {
        from: `"Tag der Offenen Tür AKG" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: 'Anmeldebestätigung als Nachrücker',
        html: html
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    });
}
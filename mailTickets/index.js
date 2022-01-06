import html_to_pdf from "html-pdf-node";
import fs from "fs";
import Mustache from "mustache";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./models/user.js";

dotenv.config();
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

const templatePdf = fs.readFileSync("./views/templatePdf.html", "utf8");
const options = { format: 'A4', path: "./pdf/example.pdf" };

const template = fs.readFileSync("./views/template.html", "utf8");

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let htmlPdf, html, file;

const personArr = UserModel.find({}).cursor();
personArr.eachAsync(async person => await sendMail(person));

const sendMail = async (data) => {
    console.log(data.email);
    htmlPdf = Mustache.render(templatePdf, data);
    html = Mustache.render(template, data);
    file = { content: html, name: 'example.pdf'};

    await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        console.log("PDF Buffer:-", pdfBuffer);
    }).catch(err => {
        console.log(err);
    });

    const mailOptions = {
        from: `"Tag der Offenen Tür AKG" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: 'Ticket für Tag der offenen Tür',
        html: html,
        attachments: [{
            filename: 'example.pdf',
            path: './pdf/example.pdf',
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

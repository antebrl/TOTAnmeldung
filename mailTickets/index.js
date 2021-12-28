import html_to_pdf from "html-pdf-node";
import fs from "fs";
import Mustache from "mustache";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let data = {
    name: "Hallo",
    time: "10 Uhr",
    dependants: "3",
};

let template = fs.readFileSync("./views/templatePdf.html", "utf8");
let html = Mustache.render(template, data);

let options = { format: 'A4', path: "./pdf/example.pdf" };

let file = { content: html, name: 'example.pdf'};

await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    console.log("PDF Buffer:-", pdfBuffer);
}).catch(err => {
    console.log(err);
});

//Mail
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

template = fs.readFileSync("./views/template.html", "utf8");
html = Mustache.render(template, data);

const mailOptions = {
    from: `"Tag der Offenen Tür AKG" <${process.env.EMAIL_USER}>`,
    to: "gamoxgamox@gmail.com",
    subject: 'Anmeldebestätigung',
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
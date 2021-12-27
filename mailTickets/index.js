import html_to_pdf from "html-pdf-node";
import fs from "fs";
import Mustache from "mustache";

let data = {
    name: "Hallo",
    time: "10 Uhr",
    dependants: "3",
};

let template = fs.readFileSync("./views/template.html", "utf8");
let html = Mustache.render(template, data);

let options = { format: 'A4', path: "./pdf/example.pdf" };

let file = { content: html, name: 'example.pdf'};

html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
    console.log("PDF Buffer:-", pdfBuffer);
}).catch(err => {
    console.log(err);
});
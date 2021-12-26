const express = require("express");
const router = require('./router.js');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

const PORT = process.env.PORT || 3001;

app.use(express.json()) //Middleware POST request

app.use("/api", router);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
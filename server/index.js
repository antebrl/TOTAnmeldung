import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api", router);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
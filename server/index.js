import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import bodyParser from "body-parser";
import path from "path";

import Router from "./routes/route.js";
import Connection from "./database/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = 8000;
const __dirname = path.resolve();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
})

app.listen(PORT, () => { console.log(`Server is Running on ${PORT}`) });

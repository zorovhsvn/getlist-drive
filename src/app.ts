import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes";
import fs from "fs";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/", router);
try {
    const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "../account/credentials.json")).toString());
    const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, "../account/tokens.json")).toString());
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
} catch(ex) {
    console.error(`Please install account before start server`);
}
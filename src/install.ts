import fs from "fs";
import path from "path";
import readline from "readline";
import { authorize } from "./gapis";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "../account/credentials.json")).toString());
(async() => {
    const authUrl = await authorize(credentials, "generateAuth");
    console.log(`Load url and auth: ${authUrl}`);
    rl.question('Enter code: ', async(code) => {
        const tokens = await authorize(credentials, "getAccessToken", code);
        fs.writeFileSync(path.join(__dirname, "../account/tokens.json"), JSON.stringify(tokens));
        rl.close();
    });
})();
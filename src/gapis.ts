import fs = require("fs");
import path from "path";
import { google } from "googleapis";
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "../account/credentials.json")).toString());
const SCOPES = [
    "https://www.googleapis.com/auth/drive"
];
export const authorize = (credentials: any, type: string, code: string = "") => {
    return new Promise((resolve,reject) => {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        if(type === "generateAuth") {
            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: "offline",
                scope: SCOPES,
            });
            resolve(authUrl);
        } else if(type === "getAccessToken") {
            oAuth2Client.getToken(code, (err: any, token: any) => {
                if (err) return reject("Error retrieving access token");
                resolve(token);
            });
        } else {
            const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, "../account/tokens.json")).toString());
            oAuth2Client.setCredentials(tokens);
            resolve(oAuth2Client);
        }
    });
}
export const getlist = (folderId: string) => {
    return new Promise((resolve,reject) => {
        authorize(credentials, "getdata").then((auth: any) => {
            const drive = google.drive({version: 'v2', auth});
            drive.children.list({
                folderId,
                orderBy: "title"
            }, (err: any, data: any) => {
                if(err) reject(err);
                resolve(data.data);
            })
        });
    })
}
export const getinfo = (fileId: string) => {
    return new Promise((resolve,reject) => {
        authorize(credentials, "getdata").then((auth: any) => {
            const drive = google.drive({version: 'v2', auth});
            drive.files.get({
                fileId,
                supportsTeamDrives: true
            }, (err: any, data: any) => {
                if(err) reject(err);
                resolve(data.data);
            })
        });
    })
}
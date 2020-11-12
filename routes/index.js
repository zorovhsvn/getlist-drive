const express = require("express");
const router = express.Router();
const gapi = require("../library/gapi");

router.get("/", (req,res) => {
    res.render("index");
});

router.post("/list", (req,res) => {
    let folderId = req.body.id;
    gapi.getlist(folderId).then(data => {
        res.json({
            status: 1,
            data
        });
    }).catch(() => {
        res.json({
            status: 0
        })
    })
});

router.post("/get", (req,res) => {
    let fileId = req.body.id;
    gapi.getinfo(fileId).then(data => {
        res.json({
            status: 1,
            data
        })
    }).catch(() => {
        res.json({
            status: 0
        })
    })
});

module.exports = router;
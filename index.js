const express = require("express");
const app = express();
const port = "81";
const bodyParser = require("body-parser");
const chalk = require("chalk");
const path = require("path");
const randomid = require("randomid");

const mysql = require("mysql");
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "note-chan",
});
db.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

var appname = "Note Chan";
var dbtablename = "notechan";

require("./utils/express")(
    express,
    app,
    port,
    db,
    bodyParser,
    chalk,
    path,
    randomid,
    appname,
    dbtablename
);

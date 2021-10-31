const express = require("express");
const app = express();
const port = "81";
const bodyParser = require("body-parser");
const chalk = require("chalk");
const path = require("path");
const randomid = require("randomid");

const mysql = require("mysql");
var db = mysql.createConnection({
    host: "yourmysqlhost",
    user: "username",
    password: "pass",
    database: "mysqldbname",
});
db.connect(function (err) {
    if (err) throw err;
    console.log("DB Connected!");
});

var appname = "Simple Text App";
var dbtablename = "test";

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

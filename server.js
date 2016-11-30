var express       = require('express');
var app           = express();
var mysql         = require('mysql');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(express.static(__dirname + '/public/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
 app.use(multer());
 app.use(session({ secret: process.env.PASSPORT_SECRET }));
 app.use(cookieParser());
 */

//var con = mysql.createConnection({
//    host: "localhost",
//    user: ""
//})

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment/server/app.js")(app);
//require("./public/project/server/app.js")(app);
require("./public/server/app.js")(app);

app.listen(port, ipaddress);





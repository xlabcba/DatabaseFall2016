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

//// create a default connection string
//var connectionString = 'mysql://127.0.0.1:27017/moviedb';
//
//// use remote connection string
//// if running in remote server
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MYSQL_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MYSQL_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MYSQL_DB_HOST + ':' +
//        process.env.OPENSHIFT_MYSQL_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}
//
//// connect to the database
//var db = mysql.createConnection(connectionString);

if(process.env.OPENSHIFT_MYSQL_DB_PASSWORD) {
    db = mysql.createConnection({
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        port: process.env.OPENSHIFT_MYSQL_DB_PORT,
        user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        database: process.env.OPENSHIFT_APP_NAME
    });
} else {
    db = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '151836',
        database: 'moviedb'
    });
}

db.connect(function(err){
    if (err) {
        throw err;
    } else {
        console.log("MYSQL has been connected!!!");
    }
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment/server/app.js")(app);
//require("./public/project/server/app.js")(app);
require("./public/server/app.js")(app, db);

app.listen(port, ipaddress);





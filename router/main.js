var cp = require('cookie-parser');
var dbconfig = require('../db');
var ejs = require('ejs');

module.exports = function (app) {

    app.use(cp());
    dbconfig.connect();
    var postrouter = require('./post')(app);

    app.get('/', function (req, res) {
        if (req.cookies.is_logged_in === undefined) {
            res.redirect('/login');
        } 
        else if (req.cookies.is_logged_in === 'false') {
            res.redirect('/login');
        }
        else {
            res.redirect('/main');
        }
    });

    app.get('/login', function (req, res) {
        res.render('login',{login:req.cookies.is_logged_in});
    });

    app.get('/room', function (req, res) {
        if (req.cookies.is_logged_in === undefined) {
            res.redirect('/login');
        }
        else if (req.cookies.is_logged_in === 'false') {
            res.redirect('/login');
        }
        else{
            var sql = 'SELECT * FROM stay NATURAL JOIN(SELECT * FROM reservation NATURAL JOIN customers)newstay';
            var stay_room;

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else {
                    console.log(rows);
                    stay_room = rows;
                }
            });

            var sql = 'SELECT * FROM room';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else {
                    res.render('room',{rooms:rows, stayrooms: stay_room});
                }
            });
        }
    });

    app.get('/main', function (req, res) {
        if (req.cookies.is_logged_in === undefined) {
            res.redirect('/login');
        } 
        else if (req.cookies.is_logged_in === 'false') {
            res.redirect('/login');
        }
        else {
            res.render('main');
        }
    });
}
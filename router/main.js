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
            var sql = 'SELECT * FROM(SELECT name as staff_name, room FROM users NATURAL JOIN responsibility)a NATURAL JOIN(';
            sql += 'SELECT room,nationality,personnel,should_paid,cardkey,request,cleaning,checkin,checkout FROM(';
            sql += 'SELECT * FROM stay NATURAL JOIN(SELECT sum(price) as should_paid FROM receipt_service NATURAL JOIN room_service where paid = 0 group by room)d)e NATURAL JOIN(';
            sql += 'SELECT * FROM reservation NATURAL JOIN customers)b)c';
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
var cp = require('cookie-parser');
var dbconfig = require('../db');
var ejs = require('ejs');


module.exports = function (app) {

    app.use(cp());
    dbconfig.connect();
    var postrouter = require('./post')(app); // post방식 request처리 라우터 인클루드


    app.get('/', function (req, res) {
        if (req.cookies.is_logged_in === 'true'){ // 로그인 상태면 main페이지로, 아니면 로그인 페이지로 리다이렉트
            res.redirect('/main');
        }
        else res.redirect('/login');
    });


    /* 로그인 관련 */
    app.get('/login', function (req, res) {
        res.render('login',{login:req.cookies.is_logged_in}); // 로그인 실패시 UI를 다르게 하기 위해 쿠키를 넘겨줌
    });

    app.get('/logout', function (req, res) {
        res.cookie('is_logged_in', undefined); // 로그인 쿠키를 지우고 로그인 페이지로 리다이렉트
        res.redirect('/login');
    });


    /* 메뉴 관련 */
    app.get('/notice', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('notice', { username: req.cookies.username });
        }
        else res.redirect('/login');
    });

    app.get('/equipment', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('equipment', { username: req.cookies.username });
        }
        else res.redirect('/login');
    });

    app.get('/reservation', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {

            var sql = 'SELECT *, breakfast_price+rate+extra as total_price from(select name, reservation_time, checkin, checkout, room_type, reservation.personnel,';
            sql += 'breakfast*7000 AS breakfast_price, rate, CASE WHEN reservation.personnel > room_type.personnel THEN extra ELSE 0 END AS extra from reservation';
            sql += ' JOIN customers ON reservation.email = customers.email JOIN room_type ON room_type.type = reservation.room_type)a';
            var reseravation_list;

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else reseravation_list = rows;
            });

            sql = 'SELECT name FROM nation';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else res.render('reservation', { reservation: reseravation_list, nations: rows, username: req.cookies.username});
            });
        }
        else res.redirect('/login');
    });

    app.get('/room', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {

            var room_service;
            var sql = 'SELECT service from room_service';

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else room_service = rows;
            });

            sql = 'SELECT stay.room, users.name as staff_name, nationality, stay.personnel, CASE WHEN should_paid IS NULL THEN 0 ELSE should_paid END AS should_paid, cardkey, cleaning, checkin, checkout,';
            sql += 'exists(select * from (select room from receipt_service where done=0 union select room from request)k where k.room = stay.room) AS request from stay';
            sql += ' JOIN responsibility ON stay.room = responsibility.room';
            sql += ' JOIN users ON stay.room = responsibility.room and users.id = responsibility.id';
            sql += ' JOIN reservation ON reservation.email = stay.email and reservation.reservation_time = stay.reservation_time';
            sql += ' JOIN customers ON stay.email = reservation.email and stay.reservation_time = reservation.reservation_time and customers.email = reservation.email';
            sql += ' LEFT JOIN(SELECT SUM(price) as should_paid, room from receipt_service natural join room_service where paid = 0 group by room)a ON stay.room = a.room';

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else res.render('room', { stayrooms: rows, room_service: room_service, username: req.cookies.username});
            });
        }
        else res.redirect('/');
    });

    app.get('/request_list', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {

            var sql = '(select *,"요청사항" as request_type from request) union (select room, order_time as request_time, service as details, "룸서비스" as request_type from receipt_service where done=0)';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else res.render('request_list',{allRequest:rows});
            });

        }
        else res.redirect('/');
    });

    app.get('/reload_table', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            var sql = 'SELECT stay.room, users.name as staff_name, nationality, stay.personnel, CASE WHEN should_paid IS NULL THEN 0 ELSE should_paid END AS should_paid, cardkey, cleaning, checkin, checkout,';
            sql += 'exists(select * from (select room from receipt_service where done=0 union select room from request)k where k.room = stay.room) AS request from stay';
            sql += ' JOIN responsibility ON stay.room = responsibility.room';
            sql += ' JOIN users ON stay.room = responsibility.room and users.id = responsibility.id';
            sql += ' JOIN reservation ON reservation.email = stay.email and reservation.reservation_time = stay.reservation_time';
            sql += ' JOIN customers ON stay.email = reservation.email and stay.reservation_time = reservation.reservation_time and customers.email = reservation.email';
            sql += ' LEFT JOIN(SELECT SUM(price) as should_paid, room from receipt_service natural join room_service where paid = 0 group by room)a ON stay.room = a.room';
            var stay_room, allRequest;

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else stay_room = rows;
            });

            sql = 'SELECT * FROM room ORDER BY number';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else res.render('reload_table', { rooms: rows, stayrooms: stay_room, username: req.cookies.username});
            });
        }
        else res.redirect('/');
    });

    app.get('/staff', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            var sql = 'SELECT name, id, department, phone_number, email, job_title, on_work, bank, account FROM users';
            var users, bank;

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else users = rows;
            });

            sql = 'SELECT * from bank';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else bank = rows;
            });

            sql = 'SELECT name, id, language FROM multilingual NATURAL JOIN users';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else{
                    console.log({users:users, multilingual:rows});
                    res.render('staff', { staff: users, multilingual: rows, bank:bank, username: req.cookies.username });
                }
            });
        }
        else res.redirect('/login');
    });



    /* 메인페이지, 내정보, 비밀번호 수정 관련*/
    app.get('/main', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('main', {username: req.cookies.username} );
        }
        else res.redirect('/login');
    });

    app.get('/mypage', function(req,res){
        if (req.cookies.is_logged_in === 'true'){

            var sql = 'SELECT name, id, department, phone_number, email, job_title, on_work, bank, account, addressRoad, addressDetail FROM users where id = ?';
            var params = [req.cookies.userID], info;

            dbconfig.query(sql, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else info = rows;
            });

            sql = 'SELECT * FROM multilingual WHERE id = ?'
            dbconfig.query(sql, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else{
                    console.log({info:info, multilingual: rows});
                    res.render('mypage', { info: info, multilingual: rows, username: req.cookies.username});
                }
            });
        }
        else res.redirect('/login');
    });

    app.get('/changepw', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('changepw', { status: undefined, username: req.cookies.username});
        }
        else res.redirect('/login');
    });

    
    app.get('/equipment', function (req, res) {
        res.render('equipment', { username: req.cookies.username});
    });

    
    /* 도로명주소 API */
    app.get('/jusoPopup', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('jusoPopup');
        }
        else res.redirect('/login');
    });
}
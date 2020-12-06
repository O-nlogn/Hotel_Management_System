var cp = require('cookie-parser');
var dbconfig = require('../db');
var ejs = require('ejs');


module.exports = function (app) {

    app.use(cp());
    dbconfig.connect();
    var postrouter = require('./post')(app); // post방식 request처리 라우터 인클루드


    app.get('/', function (req, res) {
        if (req.cookies.is_logged_in === 'true') { // 로그인 상태면 main페이지로, 아니면 로그인 페이지로 리다이렉트
            res.redirect('/main');
        }
        else res.redirect('/login');
    });


    /* 로그인 관련 */
    app.get('/login', function (req, res) {
        res.render('login', { login: req.cookies.is_logged_in }); // 로그인 실패시 UI를 다르게 하기 위해 쿠키를 넘겨줌
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

            var sql = 'update reservation set status = "입실예정" where DATE(checkin) = DATE(NOW()) and status = "예약완료"';
            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
            });

            sql = 'SELECT *, breakfast_price+rate+extra as total_price from(select reservation.email, name, reservation_time, status, checkin, checkout, room_type, reservation.personnel,';
            sql += 'breakfast*7000 AS breakfast_price, rate, CASE WHEN reservation.personnel > room_type.personnel THEN extra ELSE 0 END AS extra from reservation';
            sql += ' JOIN customers ON reservation.email = customers.email JOIN room_type ON room_type.type = reservation.room_type where date(checkout)>=date(subdate(now(),INTERVAL 1 DAY)))a ORDER BY checkin';
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
                else res.render('reservation', { reservation: reseravation_list, nations: rows, username: req.cookies.username });
            });
        }
        else res.redirect('/login');
    });

    app.get('/room', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {

            var sql = 'SELECT service from room_service';

            dbconfig.query(sql, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else res.render('room', { room_service: rows, username: req.cookies.username });
            });
        }
        else res.redirect('/');
    });



    app.get('/request_list', function (req, res) {
        var sql = 'select room, email, reservation_time, "요청사항" as request_type, request_time, details, 0 as cnt from request natural join stay where done=0';
        sql += ' union select room, email, reservation_time, "룸서비스" as request_type, request_time, service as details, cnt from receipt_service natural join stay where done=0';
        dbconfig.query(sql, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.writeHead(200);
                res.end();
            }
            else res.render('request_list', { allRequest: rows });
        });
    });

    app.get('/reload_table', function (req, res) {

        var stay_room;

        var sql = 'SELECT stay.room, users.name as staff_name, nationality, stay.personnel, CASE WHEN should_paid IS NULL THEN 0 ELSE should_paid END AS should_paid, cardkey, cleaning, checkin, checkout,';
        sql += 'exists(select * from (select reservation_time, email from receipt_service where done=0 union select reservation_time, email from request where done=0)k where k.reservation_time = stay.reservation_time and k.email = stay.email) AS request from stay';
        sql += ' JOIN responsibility ON stay.room = responsibility.room';
        sql += ' JOIN users ON stay.room = responsibility.room and users.id = responsibility.id';
        sql += ' JOIN reservation ON reservation.email = stay.email and reservation.reservation_time = stay.reservation_time';
        sql += ' JOIN customers ON stay.email = reservation.email and stay.reservation_time = reservation.reservation_time and customers.email = reservation.email';
        sql += ' LEFT JOIN(SELECT SUM(price*cnt) as should_paid, email, reservation_time from receipt_service natural join room_service where paid = 0 group by email,reservation_time)a ON stay.reservation_time = a.reservation_time and stay.email = a.email';

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
            else res.render('reload_table', { rooms: rows, stayrooms: stay_room, username: req.cookies.username });
        });
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
                else {
                    console.log({ users: users, multilingual: rows });
                    res.render('staff', { staff: users, multilingual: rows, bank: bank, username: req.cookies.username });
                }
            });
        }
        else res.redirect('/login');
    });



    /* 메인페이지, 내정보, 비밀번호 수정 관련*/
    app.get('/main', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('main', { username: req.cookies.username });
        }
        else res.redirect('/login');
    });

    app.get('/mypage', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {

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
                else {
                    console.log({ info: info, multilingual: rows });
                    res.render('mypage', { info: info, multilingual: rows, username: req.cookies.username });
                }
            });
        }
        else res.redirect('/login');
    });

    app.get('/changepw', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('changepw', { status: undefined, username: req.cookies.username });
        }
        else res.redirect('/login');
    });


    app.get('/equipment', function (req, res) {
        res.render('equipment', { username: req.cookies.username });
    });


    /* 도로명주소 API */
    app.get('/jusoPopup', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('jusoPopup');
        }
        else res.redirect('/login');
    });

    /* 보여주기용 */
    app.get('/sales', function (req, res) {
        if (req.cookies.is_logged_in === 'true') {
            res.render('sales', { username: req.cookies.username });
        }
        else res.redirect('/login');
    });

    // app.get('/test', (req, res) => {
    //     res.render('example/checkout');
    // });
}
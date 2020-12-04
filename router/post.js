var qs = require('querystring');
var express = require('express')
var crypto = require('crypto');
var moment = require('moment');
var dbconfig = require('../db');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded( {extended : false } ));

    /* 로그인 버튼을 눌렀을 때 request 처리 */
    app.post('/login_data', function (req, res) {
        
        var id = req.body.id;
        var pw = req.body.pw;
        res.cookie('userID', id);

        // db에서 id, pw가 일치하는 직원이 있는지 검색 
        var sql = 'SELECT * FROM users WHERE id=? and password=?';
        var params = [id, crypto.createHash('sha512').update(pw).digest('hex')];

        dbconfig.query(sql, params, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.writeHead(200);
                res.end();
            }
            else {
                if (rows.length == 0) {
                    console.log('아이디나 비밀번호가 틀렸습니다.');
                    res.cookie('is_logged_in', false);
                }
                else {
                    console.log('로그인 성공');
                    res.cookie('is_logged_in', true);
                    res.cookie('username',rows[0].name);
                }
            }

            res.redirect('/');
        });
    });


    /* 비밀번호 변경 확인을 눌렀을 때 request 처리*/
    app.post('/password', function (req, res) {
        var curpw = req.body.curpw;
        var newpw = req.body.newpw;
        var checkpw = req.body.checkpw;

        if (newpw !== checkpw){ 
            res.render('changepw', {status: 'newpw_not_match', username: req.cookies.username});
        }
        else{
            var sql = 'SELECT password FROM users WHERE id=?';
            var params = [req.cookies.userID];

            dbconfig.query(sql, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else {
                    curpw = crypto.createHash('sha512').update(curpw).digest('hex');
                    newpw = crypto.createHash('sha512').update(newpw).digest('hex');
                    
                    if (rows[0].password !== curpw) {
                        res.render('changepw', { status: 'curpw_not_match', username: req.cookies.username});
                    }
                    else{

                        sql = 'UPDATE users SET password=? WHERE id=?';
                        params = [newpw,req.cookies.userID];

                        dbconfig.query(sql, params, function (err2, rows2, fields2) {
                            if (err2) {
                                console.log(err2);
                                res.writeHead(200);
                                res.end();
                            }
                            else res.render('main', {username: req.cookies.username});
                        });
                    }
                }
            });
        }
    });


    /* 예약 추가 버튼을 눌렀을때 request 처리 */
    app.post('/add_reservation', function (req, res) {
        var name = req.body.reservation_name;
        var email = req.body.email_id+"@"+req.body.email_select;
        var birth = req.body.reservation_birth;
        var nationality = req.body.reservation_nation;
        var personnel = req.body.reservation_people;
        var checkin = req.body.checkin_date;
        var checkout = req.body.checkout_date;
        var room_type = req.body.reservation_type;
        var breakfast = req.body.reservation_breakfast;
        var password = crypto.createHash('sha512').update(req.body.reservation_pw).digest('hex');

        var sql = 'SELECT * from customers where email=?';
        var params = [email];

        dbconfig.query(sql, params, function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.writeHead(200);
                res.end();
            }
            else {
                /* 새로운 고객이면 DB에 추가 */
                if (rows.length == 0) {
                    sql = 'INSERT INTO customers VALUES(?,?,?,?)';
                    params = [email, name, birth, nationality];

                    dbconfig.query(sql, params, function (err2, rows2, fields2) {
                        if (err2) {
                            console.log(err);
                            res.writeHead(200);
                            res.end();
                        }
                    });
                }

                /* 예약 추가 */
                sql = 'INSERT INTO reservation VALUES(?,DEFAULT,?,?,?,?,?,?,DEFAULT)';
                params = [email, checkin, checkout, password, room_type, personnel, breakfast]; 


                dbconfig.query(sql, params, function (err2, rows2, fields2) {
                    if (err2) {
                        console.log(err);
                        res.writeHead(200);
                        res.end();
                    }
                });
            }

            res.redirect('/reservation');
        });
    });


    app.post('/add_user', function (req, res) {
        var count_query = 'SELECT COUNT(*) as cnt '
                        + 'FROM users '
                        + 'WHERE id LIKE ?';
        var date_format = moment().format('YYYYMM');
        if (req.body.department === undefined) {
            res.send({success: false, error: 'NOT_ENOUGH_INFO'});
        }
        else {
            var department_number = {'기획부' : 0, '시설안전부' : 1, '식음료부' : 2, '인사부' : 3, '재무부' : 4, '프론트' : 5}[req.body.department];

            console.log(date_format + department_number);
            dbconfig.query(count_query, date_format + department_number + '%', (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    console.log(rows[0].cnt);
                    var user_count = rows[0].cnt;
                    if (user_count >= 999) {
                        res.send({success: false, error: 'TOO_MANY_USERS'});
                    }
                    else {
                        var insert_query = 'INSERT INTO users VALUES(?';
                        for (var i = 1; i < 15 ; i++) {
                            insert_query += ', ?';
                        }
                        insert_query += ')';

                        var new_user_id = date_format + department_number + ('000'+String(user_count+1)).slice(-3);
                        var params = [new_user_id, crypto.createHash('sha512').update(new_user_id).digest('hex'),
                                req.body.name,  req.body.gender, req.body.phone_number, 
                                req.body.department, req.body.birth, req.body.job_title,
                                0, req.body.email, req.body.bank, req.body.account, 
                                req.body.salary, req.body.addressRoad, 
                                req.body.addressDetail]
                        
                        if (undefined in params || req.body['multilingual[]'] === undefined) {
                            res.send({success: false, error: 'NOT_ENOUGH_INFO', body : req.body});
                        }
                        else {
                            dbconfig.query(insert_query, params, (err, rows) => {
                                if (err) {
                                    throw err;
                                }
                    
                                var languages = req.body['multilingual[]'];
                                
                                if (languages.length > 0) {
                                    var language_query = `INSERT INTO multilingual VALUES (${new_user_id}, '${languages[0]}')`;
                                    
                                    for (var i = 1 ; i < languages.length ; i++) {
                                        language_query += `, (${new_user_id}, '${languages[i]}')`;
                                    }
                                    
                                    dbconfig.query(language_query, (err, rows) => {
                                        if (err) {
                                            throw err;
                                        }
                                        res.send({success: true, user_id: new_user_id});
                                    });
                                } 
                                else {
                                    res.send({success: true, user_id: new_user_id});
                                }
                            });
                        }
                    }
                }
            });
        }
    });

    /* 요청사항 추가 버튼을 눌렀을 때 request 처리*/
    app.post('/new_request', function (req, res) {
        var room = req.body.room;
        var type = req.body.request_type;
        var cnt = req.body.cnt;
        var sql, params, email, reservation_time;

        sql = 'SELECT email, reservation_time FROM stay WHERE room=?';
        params = [room];
        dbconfig.query(sql,params, function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else{
                email = rows[0].email; 
                reservation_time = rows[0].reservation_time;

                if (type === '요청사항') {
                    var content = req.body.request_details;

                    sql = 'INSERT INTO request VALUES(DEFAULT,?,0,?,?)';
                    params = [content, email, reservation_time];
                }
                else {
                    var service = req.body.service;
                    sql = 'INSERT INTO receipt_service VALUES(?,DEFAULT,0,0,?,?,?)';
                    params = [service, email, reservation_time, cnt];
                }

                dbconfig.query(sql, params, function (err2, rows2, fields2) {
                    if (err2) {
                        console.log(err2);
                    }
                });
                res.send();
            }
        });
    });


    /* 요청사항 완료 또는 닫기 버튼 눌렀을 때 */
    app.post('/request_data', function (req, res) {
        var email = req.body.email;
        var reservation_time = req.body.reservation_time;
        var status = req.body.status;
        var request_time = req.body.request_time;
        var type = req.body.request_type;
        var details = req.body.details;
        var sql, params;

        if (type === '룸서비스'){
            if (status === 'delete') sql = 'DELETE from receipt_service WHERE email=? and reservation_time=? and service=? and request_time=?';
            else sql = 'UPDATE receipt_service SET done=1 WHERE email=? and reservation_time=? and service=? and request_time=?';
        }
        else{
            if (status === 'delete') sql = 'DELETE from request WHERE email=? and reservation_time=? and details=? and request_time=?';
            else sql = 'UPDATE request SET done=1 WHERE email=? and reservation_time=? and details=? and request_time=?';
        }

        params = [email, reservation_time, details, request_time];
        dbconfig.query(sql, params, function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
        });
        res.send();
    });

    app.post('/checkout', (req, res) => {
        var params = [req.body.email, req.body.time];
        if (undefined in params) {
            res.send({success: false, error: 'NOT_ENOUGH_INFO'});
        }
        else {
            var receipt_query = 'SELECT SUM(price) as sum FROM receipt_service NATURAL JOIN room_service WHERE paid = 0 AND email = ? AND reservation_time = ?';
            dbconfig.query(receipt_query, params, (err, rows) => {
                if (err) {
                    throw err;
                }

                service_charge = rows[0].sum;
                var delete_responsibility_query = 'DELETE FROM responsibility WHERE room = (SELECT room FROM stay WHERE email = ? AND reservation_time = ?)';
                dbconfig.query(delete_responsibility_query, params, (err) => {
                    if (err) {
                        throw err;
                    }

                    var delete_stay_query = 'DELETE FROM stay WHERE email = ? AND reservation_time = ?';
                    dbconfig.query(delete_stay_query, params, (err) => {
                        if (err) {
                            throw err;
                        }

                        res.send({success: true, charge: service_charge});
                    });
                });
            });
        }
    });

    app.post('/checkin', (req, res) => {
        var params = [req.body.email, req.body.time];
        if (undefined in params) {
            res.send({success: false, error: 'NOT_ENOUGH_INFO'});
        }
        else {
            var spec = null;
            // must consider broken condition
            var type_query = 'SELECT room_type, personnel FROM reservation WHERE email = ? AND reservation_time = ?';
            dbconfig.query(type_query, params, (err, rows) => {
                if (err) {
                    throw err;
                }
                
                var room_type = rows[0].room_type;
                var men = rows[0].personnel;
                var room_choice_query = 'SELECT number FROM room WHERE type = ? AND number NOT IN (SELECT room FROM stay)';
                
                dbconfig.query(room_choice_query, [room_type], (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    
                    var match_query = 'SELECT id, name FROM users A WHERE department = \'프론트\' AND on_work = 1 '
                                       + 'AND (SELECT COUNT(*) FROM responsibility B WHERE B.id = A.id) <= '
                                       + ' ALL(SELECT COUNT(room) FROM users A LEFT OUTER JOIN responsibility B '
                                       + 'ON A.id = B.id WHERE department = \'프론트\' AND on_work = 1 GROUP BY A.id)';

                    var insert_query = 'INSERT INTO responsibility VALUE (?, ?)';

                    if (rows.length > 0) {
                        var selected_room = rows[0].number;
                        var stay_query = 'INSERT INTO stay VALUE (?, ?, ?, ?, ?, ?)';
                        var params = [selected_room, req.body.email, req.body.time, 1, 0, men];
                        dbconfig.query(stay_query, params, (err, rows) => {
                            if (err) {
                                throw err;
                            }

                            dbconfig.query(match_query, (err, rows) => {
                                if (err) {
                                    throw err;
                                }

                                if (rows.length > 0) {
                                    var selected_user = rows[0].id;
                                    var user_name = rows[0].name;
                                    dbconfig.query(insert_query, [selected_user, selected_room], (err, rows) => {
                                        if (err) {
                                            throw err;
                                        }
                                        else {
                                            res.send({success:true, user_id:selected_user, user_name:user_name, 
                                                     room_num:selected_room, spec:spec});
                                        }
                                    });
                                }
                                else {
                                    res.send({success:false, error:'NO_WORKING_USERS'});
                                }
                            });                                    
                        });
                    }
                    else {
                        // 헉 빈방이 없다니
                    }
                });
            });

            }
    });
  
    /* 도로명주소 API */
    app.post('/jusoPopup', function (req, res) {
        res.render('jusoPopup', {locals: req.body});
    });
}
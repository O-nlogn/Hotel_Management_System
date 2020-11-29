var qs = require('querystring');
var express = require('express')
var crypto = require('crypto');
var dbconfig = require('../db');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded( {extended : false } ));

    /* 로그인 버튼을 눌렀을 때 request 처리 */
    app.post('/login_data', function (req, res) {
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var pw = post.pw;
            res.cookie('userID', id);

            /* db에서 id, pw가 일치하는 직원이 있는지 검색 */
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
                    }
                }

                res.redirect('/');
            });
        });
    });


    /* 비밀번호 변경 확인을 눌렀을 때 request 처리*/
    app.post('/password', function (req, res) {
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var curpw = post.curpw;
            var newpw = post.newpw;
            var checkpw = post.checkpw;

            if (newpw !== checkpw){ 
                res.render('changepw', {status: 'newpw_not_match'});
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
                            res.render('changepw', {status: 'curpw_not_match'});
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
                                else  res.render('main');
                            });
                        }
                    }
                });
            }

        });
    });

    /* 도로명주소 API */
    app.post('/jusoPopup', function (req, res) {
        res.render('jusoPopup', {locals: req.body});
    });
}
var qs = require('querystring');
var dbconfig = require('../db');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('login.html');
    });
    app.get('/login', function (req, res) {
        res.render('login.html');
    });
    app.get('/main', function (req, res) {
        res.render('main.html');
    });


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

            /* db에서 id, pw가 일치하는 직원이 있는지 검색 */
            dbconfig.connect();
            var sql = 'SELECT * FROM users WHERE id=? and password=?';
            var params = [id, pw];

            dbconfig.query(sql, params, function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.writeHead(200);
                    res.end();
                }
                else {
                    if (rows.length == 0) {
                        console.log('아이디나 비밀번호가 틀렸습니다.');
                        res.writeHead(200);
                        res.end();
                    }

                    else {
                        res.render('main.html'); // 로그인 성공 시 main페이지 연결
                        console.log('로그인 성공');
                    }
                }
            });
        });
    });
}
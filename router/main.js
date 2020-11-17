var qs = require('querystring');
var dbconfig = require('../db');

module.exports = function(app){
    app.get('/', function(req,res){
        res.render('login.html');
    });
    app.get('/login', function (req, res) {
        res.render('login.html');
    });
    app.get('/main', function(req, res){
        res.render('main.html');
    });

    app.post('/login_data', function(req, res){
        var body = '';
        req.on('data', function(data){
            body = body + data;
        });
        req.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var pw = post.pw;
            
            dbconfig.connect();
            var sql = 'SELECT * FROM users WHERE id=? and password=?';
            var params = [id,pw];
            dbconfig.query(sql,params,function(err,rows,fields){
                if(err){
                    console.log(err);
                }
                else{
                    if(rows.length == 0){
                        console.log('아이디나 비밀번호가 틀렸습니다.'); 
                    }

                    else console.log('로그인 성공');
                }
            });

            res.writeHead(200);
            res.end();
        });
    });
}
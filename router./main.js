var qs = require('querystring');

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

            res.writeHead(200);
            res.end();
        });
    });
    
}
var express = require('express');
var app = express();
var ejs = require('ejs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000);

app.get('/', function (req, res) {
    res.render('main');
});

app.get('/room', function (req, res) {
    res.render('room');
});

app.get('/login', function (req, res) {
    res.render('login', {login: false});
});

app.get('/room_status', function (req, res) {
    res.render('room_status');
});

app.get('/nav', function (req, res) {
    res.render('nav');
});

/* 이미지, css 등 정적파일에 접근하기 위해 public 폴더 추가*/
app.use(express.static('public'));
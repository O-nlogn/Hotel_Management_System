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
    res.render('room', {rooms:
        [
            {number: '301', empty: 'false', nation: 'kr', status: {trash: 'true', key: 'true', request: 'true'}},
            {number: '302', empty: 'true', nation: '', status: {trash: 'false', key: 'false', request: 'false'}},
            {number: '303', empty: 'true', nation: '', status: {trash: 'false', key: 'false', request: 'false'}},
            {number: '304', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'false'}},
            {number: '305', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'true'}},
            {number: '306', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'false'}},
            {number: '307', empty: 'true', nation: '', status: {trash: 'false', key: 'false', request: 'false'}},
            {number: '308', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'true'}},
            {number: '309', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'true'}},
            {number: '310', empty: 'true', nation: '', status: {trash: 'false', key: 'false', request: 'false'}},
            {number: '311', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'false'}},
            {number: '312', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'true'}},
            {number: '401', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'false'}},
            {number: '402', empty: 'false', nation: '', status: {trash: 'false', key: 'false', request: 'false'}},
            {number: '403', empty: 'false', nation: '', status: {trash: 'false', key: 'true', request: 'false'}},
            {number: '404', empty: 'false', nation: '', status: {trash: 'true', key: 'true', request: 'false'}},
            {number: '405', empty: 'false', nation: '', status: {trash: 'true', key: 'false', request: 'false'}},
            {number: '406', empty: 'false', nation: '', status: {trash: 'false', key: 'false', request: 'false'}},
            {number: '407', empty: 'false', nation: '', status: {trash: 'true', key: 'true', request: 'true'}},
            {number: '408', empty: 'false', nation: '', status: {trash: 'true', key: 'true', request: 'true'}}
        ]
    });
});

app.get('/login', function (req, res) {
    res.render('login', {login: false});
});

app.get('/room_status', function (req, res) {
    res.render('room_status', {data:
        [{room_number: '301', check_in: 'true', country: "South Korea", trash: 'true', key: 'true', request: 'true'},
         {room_number: '302', check_in: 'true', country: "South Korea", trash: 'true', key: 'false', request: 'true'}]
    });
});

app.get('/nav', function (req, res) {
    res.render('nav');
});

/* 이미지, css 등 정적파일에 접근하기 위해 public 폴더 추가*/
app.use(express.static('public'));
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
    res.render('room', {
        rooms:
        [
            {number: 301, type: 'standard'},
            { number: 302, type: 'standard' },
            { number: 303, type: 'standard' }
        ],
            
        stayrooms: 
        [
            {room: 301, staff_name: '신민경', nationality: 'SouthKorea', personnel: 2, should_paid: 1000, cardkey: 0, request: '청소 깨끗이 해주세요', cleaning: 0,
                    checkin: '2020-11-21 14:00:00', checkout: '2020-11-25 11:00:00'}, 
            {room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
            checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'}
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
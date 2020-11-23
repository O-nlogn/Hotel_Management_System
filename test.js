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
                {number: '301', type: 'standard'},
                {number: '302', type: 'standard'},
                {number: '303', type: 'standard'}
            ],
            
        stayrooms: 
            [
                {
                    email: 'testmail@hanyang.ac.kr',
                    reservation_time: '2020-11-20 01:50:02',
                    number: '301',
                    cardkey: 0,
                    request: '청소 깨끗이 해주세요',
                    cleaning: 0,
                    checkin: '2020-11-21 14:00:00',
                    checkout: '2020-11-25 11:00:00',
                    password: 'dkfj3pfj3lks92k4rn1',
                    room_type: 'standard',
                    personnel: 2,
                    breakfast: 0,
                    name: 'smk',
                    birth: '2019-11-25',
                    nationality: 'SouthKorea'
                },
                {
                    email: 'test2mail@hanyang.ac.kr',
                    reservation_time: '2020-11-19 02:50:02',
                    number: '303',
                    cardkey: 1,
                    request: '영어 가능한 직원 불러주세요',
                    cleaning: 1,
                    checkin: '2020-11-20 14:00:00',
                    checkout: '2020-11-26 11:00:00',
                    password: 'e2ad2j3lks92k4rn1',
                    room_type: 'standard',
                    personnel: 1,
                    breakfast: 1,
                    name: 'smk2',
                    birth: '2019-11-25',
                    nationality: 'USA'
                }
            ]
    });
});

app.get('/login', function (req, res) {
    res.render('login', {login: false});
});

app.get('/room_status', function (req, res) {
    res.render('room_status', {
        data:
            [
                {room_number: '301', check_in: 'true', country: "South Korea", trash: 'true', key: 'true', request: 'true'},
                {room_number: '302', check_in: 'true', country: "South Korea", trash: 'true', key: 'false', request: 'true'}
            ]
    });
});

app.get('/staff', function (req, res) {
    res.render('staff');
});

app.get('/reservation', function (req, res) {
    res.render('reservation');
});



/* 이미지, css 등 정적파일에 접근하기 위해 public 폴더 추가*/
app.use(express.static('public'));
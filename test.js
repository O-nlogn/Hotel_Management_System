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
            { number: 303, type: 'standard' },
            
            { number: 303, type: 'standard' }
        ],

        stayrooms:
        [
            {room: 301, staff_name: '신민경', nationality: 'SouthKorea', personnel: 2, should_paid: 1000, cardkey: 0, request: '청소 깨끗이 해주세요', cleaning: 0,
                    checkin: '2020-11-21 14:00:00', checkout: '2020-11-25 11:00:00'},
            {room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
            checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'},
            
            {room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
            checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'}
        ],
        //request 부분에 필요한 내용도 room으로 보내줘야함
        //해당 날짜의 실시간 request 만 넘겨
        realtime_request:
        [
          {sort:'룸서비스', request_time: '11:30:00' , room: '401', request_details:'(룸서비스 주문내역)', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' },
          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' }

        ]
    });
});

app.get('/login', function (req, res) {
    res.render('login', {login: false});
});

app.get('/logout', function (req, res) {
    res.cookie('is_logged_in', undefined);
    res.redirect('/login');
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
    res.render('staff', {
        staff:
            [
                {name: '짱구', id: '2222222222', department: '프론트', phone_number: '010-5555-6666', email: 'staff9@naver.com', job_title: '부장', on_work: 0},
                {name: '장금이', id:'1111111111', department: '식음료부', phone_number: '010-3333-4444', email: 'staff1@naver.com', job_title: '과장', on_work:1}
            ],
        multilingual:
            [
                {name: '짱구', id:'2222222222', language: '일본어'}
            ]
    });
});

app.get('/reservation', function (req, res) {
    res.render('reservation', {
        reservation: 
        [
                {name: '스핑크스', reservation_time: '2021-11-23T03:48:12.000Z', checkin: '2021-11-26T04:00:00.000Z', checkout:'2021-01-12T02:00:00.000Z',
                room_type: 'Twin', personnel: 3, breakfast_price: 0, rate: 50000, extra: 12000, total_price: 67000},
                {name: '가으앙시', reservation_time: ' 2021-11-09T12:48:12.000Z', checkin: '2021-11-26T04:00:00.000Z', checkout: '2021-01-12T02:00:00.000Z',
                room_type: 'single', personnel: 1, breakfast_price: 7000, rate: 50000, extra: 0, total_price: 57000}
        ]
    });
});

app.get('/mypage', function (req, res) {
    res.render('mypage');
});

app.get('/notice', function (req, res) {
    res.render('notice');
});

app.get('/changepw', function (req, res) {
    res.render('changepw');
});

app.get('/equipment', function (req, res) {
    res.render('equipment');
});

// app.get('/request', function (req, res) {
//      res.render('request', {
//        //해당 날짜의 실시간 request 만 넘겨
//        realtime_request:
//        [
//          {sort:'룸서비스', request_time: '11:30:00' , room: '401', request_details:'(룸서비스 주문내역)', status: 'undone' },
//          {sort:'요청사항', request_time: '12:00:00' , room: '503', request_details:'수건 부족', status: 'undone' }
//        ]
//      });
//  });

/* 이미지, css 등 정적파일에 접근하기 위해 public 폴더 추가*/
app.use(express.static('public'));

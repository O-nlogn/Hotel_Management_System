var express = require('express');
var app = express();
var ejs = require('ejs');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000);

app.get('/', function (req, res) {
    res.render('main',{username: '홍길동'});
});

app.get('/room', function (req, res) {
    res.render('room', {
        stayrooms:
        [
            {room: 301, staff_name: '신민경', nationality: 'SouthKorea', personnel: 2, should_paid: 1000, cardkey: 0, request: '청소 깨끗이 해주세요', cleaning: 0,
                    checkin: '2020-11-21 14:00:00', checkout: '2020-11-25 11:00:00'},
            {room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
            checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'},

            {room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
            checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'}
        ],

        //완료된 request는 allRequest에 포함되지않도록 쿼리문 짰습니당
        allRequest:
        [
          {request_type:'룸서비스', request_time: '2020-11-30 11:30:00' , room: '401', details:'(룸서비스 주문내역)' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' },
          {request_type:'요청사항', request_time: '2020-11-30 12:00:00' , room: '503', details:'수건 부족' }

        ],
        username: '홍길동'
    });
});

app.get('/reload_table', function(req, res){
    res.render('reload_table',{rooms:
        [
            { number: 301, type: 'standard' },
            { number: 302, type: 'standard' },
            { number: 303, type: 'standard' },
            { number: 303, type: 'standard' }
        ],

        stayrooms:
        [
            {
                room: 301, staff_name: '신민경', nationality: 'SouthKorea', personnel: 2, should_paid: 1000, cardkey: 0, request: '청소 깨끗이 해주세요', cleaning: 0,
                checkin: '2020-11-21 14:00:00', checkout: '2020-11-25 11:00:00'
            },
            {
                room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
                checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'
            },

            {
                room: 303, staff_name: '홍길동', nationality: 'USA', personnel: 1, should_paid: 3000, cardkey: 1, request: '영어 가능 직원 불러주세요', cleaning: 1,
                checkin: '2020-11-20 14:00:00', checkout: '2020-11-26 11:00:00'
            }
        ], username: '홍길동'});
});

app.get('/login', function (req, res) {
    res.render('login', { login: false, username: '홍길동'});
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
            ],
        username: '홍길동'
    });
});

app.get('/staff', function (req, res) {
    res.render('staff', {
        staff:
            [
                {name: '짱구', id: '2222222222', department: '프론트', phone_number: '010-5555-6666', email: 'staff9@naver.com', job_title: '부장', on_work: 0},
                {name: '장금이', id:'1111111111', department: '식음료부', phone_number: '010-3333-4444', email: 'staff1@naver.com', job_title: '과장', on_work:1}
            ],
        bank:
            [
                {name: 'IBK기업'}, {name: '농협'}, {name: '우리'}, {name: '신한'}, {name: '국민'}, {name: '하나'}, {name: '수협'}, {name: '새마을'}
            ],
        multilingual:
            [
                {name: '짱구', id:'2222222222', language: '일본어'}
            ], username: '홍길동'
    });
});

app.get('/reservation', function (req, res) {
    res.render('reservation', {
        reservation:
        [
          {name: '스핑크스', status:'취소',reservation_time: '2021-11-23T03:48:12.000Z', checkin: '2021-11-26T04:00:00.000Z', checkout:'2021-01-12T02:00:00.000Z',
          room_type: 'Twin', personnel: 3, breakfast_price: 0, rate: 50000, extra: 12000, total_price: 67000},
          {name: '가으앙시',  status:'입실예정',reservation_time: ' 2021-11-09T12:48:12.000Z', checkin: '2021-11-26T04:00:00.000Z', checkout: '2021-01-12T02:00:00.000Z',
          room_type: 'single', personnel: 1, breakfast_price: 7000, rate: 50000, extra: 0, total_price: 57000}
        ],
        nations:
        [
            {name: 'Austria'}, {name: 'Germany'}, {name: 'Russia'}, {name: 'Argentina'}, {name: 'Mexico'}, {name: 'Spain'}, {name: 'Egypt'}, {name: 'Australia'}, {name: 'Canada'},
            {name: 'UK'}, {name: 'USA'}, {name: 'Italy'}, {name: 'Japan'}, {name: 'China'}, {name: 'HongKong'}, {name: 'Turkey'}, {name: 'Brazil'}, {name: 'France'},
            {name: 'Finland'}, {name: 'SouthKorea'}, {name: 'India'}
        ], username: '홍길동'
    });
});

app.get('/mypage', function (req, res) {
    res.render('mypage', {
        info:
        [
            {name: 'SMK', id: '2019037129', department: '프론트', phone_number: '010-4086-6441', email: 'staff4@naver.com', job_title: '사원',
            on_work: 1, bank: 'IBK기업', account: '01309582801014', addressRoad: '경기도 안산시 상록구 한양대학로 55', addressDetail: '제4공학관 408-1'} 
        ],

        multilingual:
        [
            {id: '2019037129', language: '영어'},
            {id: '2019037129', language: '프랑스어'}
        ]
    });
});

app.get('/notice', function (req, res) {
    res.render('notice', { username: '홍길동'});
});

app.get('/changepw', function (req, res) {
    res.render('changepw', { status: undefined, username: '홍길동'});
});

app.get('/equipment', function (req, res) {
    res.render('equipment', { username: '홍길동'});
});


app.get('/changepw', function (req, res) {
    res.render('changepw', { status: '1', username: '홍길동'});
});
// app.get('/request', function (req, res) {
//      res.render('request', {
//        //해당 날짜의 실시간 request 만 넘겨
//        realtime_request:
//        [
//          {request_type:'룸서비스', request_time: '11:30:00' , room: '401', details:'(룸서비스 주문내역)' },
//          {request_type:'요청사항', request_time: '12:00:00' , room: '503', details:'수건 부족' }
//        ]
//      });
//  });

/* 이미지, css 등 정적파일에 접근하기 위해 public 폴더 추가*/
app.use(express.static('public'));

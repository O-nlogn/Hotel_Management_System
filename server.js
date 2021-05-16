var express = require('express');
var app = express();
var router = require('./router/main')(app);

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

var server = app.listen(3000);

/* 이미지, css 등 정적파일에 접근하기 위해 public 폴더 추가*/
app.use(express.static('public'));
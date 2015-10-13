var fs = require('fs');
var colors = require('colors');
var express = require('express');
var random = require('random-js')();
var cheerio = require('cheerio');

var app = express();

var apikey = 'AIzaSyAl2_VXl-axjtU_zGj-s8h1ShY3H3Le_14';
var googleTranslate = require('google-translate')(apikey);

var server = app.listen(8080, function(){
    console.log('Server Started');
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected.. emitting book');
    fs.readFile(__dirname + '/books/starwars.txt', 'utf8', function (err, data) {
        var bookarray = data.split(' ');
        for(i=200;i<1200;i++) {
            io.emit('book', bookarray[i]);
        }
    });
});

app.get('/', function(req, res){
    res.sendfile("index.html");
});

app.get('/api/translate/:word', function (req, res, next) {
    googleTranslate.translate(req.params.word, 'en', function(err, translation) {
        message = translation.translatedText;
        res.json(message);
    });
});
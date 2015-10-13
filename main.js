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

var io = require('socket.io').listen(server, function(){
    console.log('Socket io Started');
});

fs.readFile(__dirname + '/books/book.txt', 'utf8', function (err, data) {
    var bookarray = data.split('. ');
    var arrayCount = [];
    
    for(i=0;i<bookarray.length;i++) {
        r = random.integer(0, 10);
        if (r == 1) {
            arrayCount[i] = i;
            googleTranslate.translate(bookarray[i], 'de', function(err, translation) {
                bookarray[arrayCount[i]] = translation.translatedText+'*********';
            });
        }
    }
    
    setTimeout(function(){
        for(i=0;i<bookarray.length;i++) {
            console.log(bookarray[i]+'. ');
        }
    }, 10000);
});



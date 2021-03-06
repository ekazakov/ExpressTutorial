var express = require('express');
var handlebars = require('express3-handlebars')
    .create({
        defaultLayout: 'main',
        extname: '.hbs'
    })
;

var app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    var fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: fortune});
});

app.use(function (req, res) {
    res.status('404');
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; precc Ctrl-C to terminate.');
});

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

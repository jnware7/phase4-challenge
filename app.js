const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const index = require('./routes/index');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();

// view engine setup
app.set('views',  'views');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.static('public'));


app.use('/', index);
app.use('/users', users);
app.use('/reviews', reviews);

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})

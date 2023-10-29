var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.get('/cutecat', (req, res) => {
  console.log('Request received for /cutecat')
  res.send('&nbsp;/\\_/\\<br>( o.o )<br>&nbsp;&gt; ^ &lt;');
})
app.get('/api/cutecat', (req, res) => {
  res.json('"name": "Whiskers","breed": "Huskat","color": "Cream and White","age": 2,"personality": "Playful and Affectionate","hobbies": ["Chasing laser pointers", "Napping in sunny spots", "Purring"],"isCute": true, "favoriteToys": ["Ball", "Socks"],"imageURL": "localhost:3000/static/images/cat.jpg"')
})  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{ title: 'Your Page Title' });
});

module.exports = app;


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
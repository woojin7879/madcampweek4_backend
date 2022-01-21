var express = require('express');
var app = express();
var userrouter = require('./routes/api/user');
var bookrouter = require('./routes/api/book');
var noderouter = require('./routes/api/node');
var cbrouter = require('./routes/api/commentbook');
var cnrouter = require('./routes/api/commentnode');
var lcbrouter = require('./routes/api/likecommentbook');
var lcnrouter = require('./routes/api/likecommentnode');
var lbrouter = require('./routes/api/likebook');
var lnrouter = require('./routes/api/likenode');

app.use(express.json({ extended: false}));
app.use(express.urlencoded({ extended: true}));

app.use('/', userrouter);
app.use('/', bookrouter);
app.use('/', noderouter);
app.use('/', cbrouter);
app.use('/', cnrouter);
app.use('/', lcbrouter);
app.use('/', lcnrouter);
app.use('/', lbrouter);
app.use('/', lnrouter);

app.listen(80, () => {
    console.log('server listening on port 80!');
});
var express = require('express');
var app = express();
var retrofitrouter = require('./routes/retrofit');

app.use(express.json())
app.use(express.urlencoded({ extends: true}))

app.use('/retrofit', retrofitrouter);

app.listen(80, () => {
    console.log('Example app listening on port 80!');
});

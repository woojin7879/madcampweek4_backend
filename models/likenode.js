const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);


likenodeschema = mongoose.Schema({
    likenodeid:{
        type: Number
    },
    nodefrom:{
        type: Number
    },
    writer:{
        type: Number
    }
})

likenodeschema.plugin(autoIncrement.plugin, {
    model: 'likenode',
    field: 'likenodeid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Likenode = mongoose.model("likenode", likenodeschema);
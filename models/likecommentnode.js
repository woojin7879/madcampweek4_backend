const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);

likecommentnodeschema = mongoose.Schema({
    likecommentnodeid:{
        type: Number
    },
    commentnodefrom:{
        type: Number
    },
    writer:{
        type: Number
    }
})

likecommentnodeschema.plugin(autoIncrement.plugin, {
    model: 'Likecommentnode',
    field: 'likecommentnodeid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Likecommentnode = mongoose.model("Likecommentnode", likecommentnodeschema);
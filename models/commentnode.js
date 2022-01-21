const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);

commentnodeschema = mongoose.Schema({
    commentnodeid:{
        type: Number
    },
    writer:{
        type: Number
    },
    nodefrom:{
        type: Number
    },
    content:{
        type: String
    },
    likes:{
        type: Number,
        default: 0
    }
})

commentnodeschema.plugin(autoIncrement.plugin, {
    model: 'commentnode',
    field: 'commentnodeid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Commentnode = mongoose.model("commentnode", commentnodeschema);
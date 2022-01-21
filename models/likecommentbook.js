const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);


likecommentbookschema = mongoose.Schema({
    likecommentbookid:{
        type: Number
    },
    commentbookfrom:{
        type: Number
    },
    writer:{
        type: Number
    }
})

likecommentbookschema.plugin(autoIncrement.plugin, {
    model: 'likecommentbook',
    field: 'likecommentbookid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Likecommentbook = mongoose.model("likecommentbook", likecommentbookschema);
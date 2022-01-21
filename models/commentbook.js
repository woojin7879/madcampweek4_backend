const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);

const commentbookSchema = mongoose.Schema({
    commentbookid:{
        type: Number
    },
    writer:{
        type: Number
    },
    bookfrom:{
        type: Number,
    },
    content:{
        type: String
    },
    likes:{
        type: Number,
        default: 0
    }

    
})

commentbookSchema.plugin(autoIncrement.plugin, {
    model: 'commentbook',
    field: 'commentbookid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Commentbook = mongoose.model("commentbook", commentbookSchema);
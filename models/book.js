const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);
const bookSchema = mongoose.Schema({
    bookid:{
        type: Number
    },
    bookname:{
        type: String
    },
    writer:{
        type: Number
    },
    category:{
        type: String
    },
    view:{
        type: Number,
        default: 0
    },
    likes:{
        type: Number,
        default: 0
    }
})

bookSchema.plugin(autoIncrement.plugin, {
    model: 'book',
    field: 'bookid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Book = mongoose.model("book", bookSchema);
const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);


likebookschema = mongoose.Schema({
    likebookid:{
        type: Number
    },
    bookfrom:{
        type: Number
    },
    writer:{
        type: Number
    }
})

likebookschema.plugin(autoIncrement.plugin, {
    model: 'likebook',
    field: 'likebookid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Likebook = mongoose.model("likebook", likebookschema);
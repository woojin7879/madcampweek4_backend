const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);

const nodeSchema = mongoose.Schema({
    nodeid:{
        type: Number
    },
    bookfrom:{
        type: Number
    },
    writer:{
        type: Number
    },
    postid:{
        type: Number,
        default: 0
    },
    content:{
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

nodeSchema.plugin(autoIncrement.plugin, {
    model: 'node',
    field: 'nodeid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = Node = mongoose.model("node", nodeSchema);
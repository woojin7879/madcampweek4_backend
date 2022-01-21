const mongoose = require("mongoose");

var autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb+srv://woojin:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority');
autoIncrement.initialize(mongoose.connection);

const userSchema = mongoose.Schema({
    userid:{
        type: Number
    },
    loginid:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 6
    },
    nickname:{
        type: String,
        maxlength: 20,
        trim: true,
        unique: 1
    },
    userlevel:{
        type: Number,
        default: 0
    },
    // token : {
    //     type: String
    // },
    // tokenexp :{
    //     type: Number
    // }

})

userSchema.plugin(autoIncrement.plugin, {
    model: 'user',
    field: 'userid',
    startAt: 1, //시작
    increment: 1 // 증가
});

module.exports = User = mongoose.model("user", userSchema);
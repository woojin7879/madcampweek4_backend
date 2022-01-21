const mongoose = require("mongoose");

const uri = "mongodb+srv://minwoo:asdf1234@socialsoseol.cpmkp.mongodb.net/prac?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = User = mongoose.model("user", UserSchema);
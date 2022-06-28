const mongoose = require("mongoose")

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        require: [true, 'É obrigatório definir um username'],
        unique: [true, 'Username deve ser único'],
    },
    email: {
        type: String,
        require: [true, 'É obrigatório vincular um email com a conta'],
        unique: [true, 'O email já é utilizado em outra conta'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        require: true
    },
})

const User = mongoose.model("users", schemaUser);

module.exports = User;
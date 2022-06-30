

import mongoose  from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        "name":{
            type: String,
            required: true
        },
        "email":{
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        "username":{
            type: String,
            required: true,
            unique: true
        },
        "password":{
            type: String,
            required: true,
            select: false //nao sera retornado quando fizer uma leitura do documento
        }
    }
);

//Antes do evento save, encriptar senha do usuario
userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
})

const User = mongoose.model('User', userSchema);
export default User;






// const mongoose = require("mongoose")

// const schemaUser = mongoose.Schema({
//     username: {
//         type: String,
//         require: [true, 'É obrigatório definir um username'],
//         unique: [true, 'Username deve ser único'],
//     },
//     email: {
//         type: String,
//         require: [true, 'É obrigatório vincular um email com a conta'],
//         unique: [true, 'O email já é utilizado em outra conta'],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//     },
//     password: {
//         type: String,
//         require: true
//     },
// })

// const User = mongoose.model("users", schemaUser);

// module.exports = User;
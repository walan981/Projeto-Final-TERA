import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken"

//import dotenv from "dotenv-safe"
import * as dotenv from "dotenv"
dotenv.config()

class AuthenticationController {

    static createToken(param) {
        return jwt.sign(param, `${process.env.API_SECRET}`,{
            expiresIn: 60*60*24
        })
    }

    static userRegister = async(request, response) => {
        const {email, username, name, password} = request.body

        const possibleUserEmail = await User.findOne({email})
        if(possibleUserEmail)
        return response.status(400).send({error: "E-mail já cadastrado!"})

        const possibleUserUsername = await User.findOne({username})
        if(possibleUserUsername)
        return response.status(400).send({error: "Username já cadastrado!"})

        const user = await User.create({email, username, name, password})
        user.password = undefined;
        return response.status(200).send({"message": "Usuário cadastrado com sucesso!", user})
    }

    static user = async(req, res) => {
        const {email, password} = req.body;

        console.log(email, password)

        const user = await User.findOne({email}).select("+password");
        if(!user)
            return res.status(400).send({error:"Usuário não encontrado"});

        const passwordConfirm = await bcrypt.compare(password, user.password);

        if(!passwordConfirm)
            return res.status(400).send({error:"A senha é inválida"});
        
        user.password = undefined
        return res.send({
            user,
            token: this.createToken({id: user.id}) //token jwt
        })
    }
}

export default AuthenticationController;
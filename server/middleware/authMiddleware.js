import jwt from "jsonwebtoken"
//import dotenv from "dotenv-safe"
import * as dotenv from "dotenv"
dotenv.config()

const auth = (req, res, next) => {
  const API_SECRET = process.env.API_SECRET
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({erro: "Token não enviado"})

  const partes = authHeader.split(" ")
  if (!partes.length === 2)
    return res.status(401).send({erro: "Token mal formatado"})

  // Bearer MEU_TOKEN
  const [_tipo, token] = partes;

  jwt.verify(token, API_SECRET, (erro, tokenDecodado) => {
    if (erro)
      return res.status(401).send({erro: "Token é inválido"})

    req.id = tokenDecodado.id
    return next();
  })

}

export default auth;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const alunoRouter = require("../routes/alunoRoutes.js");
const userRouter = require("../routes/userRoutes.js");

const dbName = "pessoa";
const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use;

app.use("/api/pessoa/aluno/", alunoRouter);
app.use("/api/users/", userRouter);


mongoose.connect(`mongodb+srv://user:password1234@cluster-tera.udkviv8.mongodb.net/checkpoint3?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
});

app.get("/", (req,res)=>{
    res.json({message: "Rota ok"});
});

app.listen(port,()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});

import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import userRouter from "./routes/userRoutes.js"

// import dotenv from "dotenv-safe"
// dotenv.config()

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use;

//app.use("/api/pessoa/aluno/", alunoRouter);
app.use("/api/users/", userRouter);


mongoose.connect(`mongodb+srv://user:password1234@cluster-tera.udkviv8.mongodb.net/checkpoint3?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
});

// let db = mongoose.connection;
// export default db;

app.get("/", (req,res)=>{
    res.json({message: "Rota ok"});
});

app.listen(port,()=>{
    console.log(`Servidor iniciado na porta ${port}`);
});
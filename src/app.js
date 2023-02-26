import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();


app.use(authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor online na porta ${PORT}`);
});
import bcrypt from "bcrypt";
import { db } from "../database/db.js";



export async function signUp (req, res){

    const { password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try{

        await db.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`,
            [req.body.name, req.body.email, passwordHash]
        );
        
        res.sendStatus(201);
    
    } catch (e) {

        console.log(e);
        res.sendStatus(500);
    } 

}
import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn(req,res){

    const { email, password } = req.body;


    try {

        const result = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
            );
        
        if(result.rowCount === 0){
            return res.sendStatus(401);
        }

        const user = result.rows[0];

        const userPassword = bcrypt.compareSync(password, user.password); 

        if(!userPassword ){

            return res.sendStatus(401);            
        }

        const token = uuid();

        const userId = user.id;

        await db.query(
            `INSERT INTO sessions ("userId", "token")
            VALUES($1,$2);`,
            [userId, token]
        );

        res.status(200).send({
            token
        });


    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }
}
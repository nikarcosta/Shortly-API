import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn(req,res){

    const { email, password } = req.body;


    try {

        const { rows: user } = await db.query(
            `SELECT * FROM users WHERE email = $1;`,
            [email]
            );
        
        if(user.length === 0){
            return res.sendStatus(401);
        }

        const userPassword = bcrypt.compareSync(password, user[0].password); 

        if(!userPassword ){

            return res.sendStatus(401);            
        }

        const token = uuid();

        res.status(200).send({
            token
        });


    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }
}
import { signUpSchema } from "../schemas/authSchema.js";
import { db } from "../database/db.js";

export async function validateNewUser(req, res, next){

    const { error } = signUpSchema.validate(req.body, { abortEarly: false});

    if( error ) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(400).send(errorMessages);
    }

    const { rows: emailExists } = await db.query(
        `SELECT * FROM users WHERE email = $1;`,
        [req.body.email]
    );

    if(emailExists.length !== 0){
        return res.sendStatus(409);
    }

    next();
}

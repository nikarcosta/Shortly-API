import { db } from "../database/db.js";

export async function authValidation(req, res, next){
    
    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", '').trim();
  

    if (!token) return res.status(401).send("Token is missing");

    try {

        const checkSession = await db.query(
            `SELECT * FROM sessions
            WHERE token = $1;`,
            [token]
        );

        const session = checkSession.rows[0];

        if(!session){

            return res.sendStatus(401);
        }

        res.locals.session = session;

        next();
    
    } catch (e) {

        return res.status(500).send(e);
    }

}
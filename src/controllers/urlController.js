import { db } from "../database/db.js";
import { nanoid } from "nanoid";

export async function shorten(req, res){

    const { url } = req.body;

    const shortUrl = nanoid(8);

    const { userId } = res.locals.session;

    try{

        await db.query(
            `INSERT INTO links ("userId", "url", "shortUrl")
            VALUES ($1, $2, $3);`,
            [userId, url, shortUrl]
        );

        const result = await db.query(
            `SELECT id, "shortUrl" FROM links
            WHERE url = $1;`,
            [url]
        );

        return res.status(201).send(result.rows[0]);


    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }


}
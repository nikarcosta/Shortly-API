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

export async function getUrlById(req, res){
    
    const { id } = req.params;

    try {

        const result = await db.query(
            `SELECT * FROM links
            WHERE id = $1;`,
            [id]
        );

        if (result.rowCount === 0){
            return res.sendStatus(404);
        }

        const urlData = result.rows[0];


        res.status(200).send({
            id: urlData.id,
            shortUrl: urlData.shortUrl,
            url: urlData.url
        });


    } catch (e) {

        console.log(e);
        res.sendStatus(500);
    }

}

export async function openShortUrl(req,res){

    const { shortUrl } = req.params;

    try{

        const result = await db.query(
            `SELECT * FROM links 
            WHERE "shortUrl" = $1;`,
            [shortUrl]
        );

        if(result.rowCount === 0){
            return res.sendStatus(404);
        }

        const urlData = result.rows[0];

        let linkViews = Number(urlData.visitCount) + 1;

        await db.query(
            `UPDATE links SET "visitCount" = $1
            WHERE "shortUrl" = $2;`,
            [linkViews, shortUrl]
        );

        const targetUrl = urlData.url;

        res.redirect(targetUrl);

    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }
}

export async function deleteUrl(req, res){

    const { id } = req.params;

    const { userId } = res.locals.session;

    try{

        const result = await db.query(
            `SELECT * FROM links
            WHERE id = $1;`,
            [id]
        );
    
        if(result.rowCount === 0){
            return res.sendStatus(404);
        }
    
    
        const linkData = result.rows[0];
    
        if(userId != linkData.userId){

            return res.sendStatus(401);
        }

        await db.query(
            `DELETE FROM links
            WHERE "id" = $1;`,
            [id]
        );

        res.sendStatus(204);

    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }

}

export async function getUser(req, res){

    const { userId } = res.locals.session;

   

    try {

        const userData = (await db.query(
            `SELECT users.id, users.name,
            COALESCE(SUM("links"."visitCount"),0) as "visitCount"
            FROM users
            LEFT JOIN "links" ON users.id = "links"."userId"
            WHERE users.id = $1
            GROUP BY users.id;`,
            [userId]
        )).rows[0];


        const shortenedUrls = (await db.query(
            `SELECT id, "shortUrl", url, "visitCount"
            FROM links
            WHERE "userId" = $1;`,
            [userId]
        )).rows;

        const userDetails = {...userData, shortenedUrls};

        return res.status(200).send(userDetails);


    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }

}
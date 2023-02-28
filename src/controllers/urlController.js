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

    try{

        const visitsResult = await db.query(
            `SELECT SUM("visitCount") FILTER (WHERE "userId" = $1) FROM links;`,
            [userId]);

        const [visitsCount] = visitsResult.rows;

        const urlsResult = await db.query(
            `SELECT * FROM links 
            WHERE "userId" = $1`, 
            [userId]);
        
        const userUrls = urlsResult.rows;

        const userDataResult = await db.query(
            `SELECT * FROM users
            WHERE "userId" = $1`,
            [userId]);

        const userData = userDataResult.rows[0];

        const name = userData.name;


        res.status(200).send({
            id: userId,
            name,
            visitCount: visitsCount || 0,
            shortenedUrls: userUrls
        });

    } catch (e) {

        console.log(e);
        res.sendStatus(500);

    }

}
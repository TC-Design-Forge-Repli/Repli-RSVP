const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all guests
router.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM "guests"
        ORDER BY "id" ASC;
    `;
    
    pool.query(sqlQuery)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            console.error('Error /api/partyGuests GET all:', dbErr);
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {
    const party_id = req.params.id;
    console.log('sending guests with party_id', party_id)

    const sqlQuery = 
    `
        SELECT 
            "guests"."id" AS "guest_id",
            "party"."id" AS "party_id", 
            "party"."event_id" AS "event_id",  
            "party"."name" AS "party_name",
            "guests"."name" AS "guest_name", 
            "guests"."response" AS "guest_response", 
            "guests"."meal_id" AS "meal_id",
            "meal_options"."meal_name" AS "meal_name"
        FROM "guests"
        JOIN "party" 
            ON "guests"."party_id" = "party"."id"
        FULL OUTER JOIN "meal_options" 
            ON "guests"."meal_id" = "meal_options"."id"
        WHERE "guests"."party_id" = $1 
            
        ORDER BY "guest_id" ASC;
    `;
    const sqlValue = [party_id]
    pool.query(sqlQuery, sqlValue)
    .then(dbRes => {
        res.send(dbRes.rows);
        //console.log('here are the guests you requested', dbRes.rows);
     })
     .catch(dbErr => {
        console.log('GET route for partyGuests failed', dbErr);
        res.sendStatus(500);
     })
});

router.delete('/:id', (req, res) =>{
    const guestId = req.params.id
    const sqlQuery = `
    DELETE FROM "guests"
    WHERE "id" = $1;
    `
    const sqlValue = [guestId]
    pool.query(sqlQuery, sqlValue)
        .then((dbRes) =>{
            res.sendStatus(200)
        })
        .catch((dbErr) =>{
            console.log('Problem deleting one guest in server', dbErr)
            res.sendStatus(500)
        })
})

router.get('/guests/:id', (req, res) => {
    console.log('req.params:', req.params);

    const sqlQuery = `
    SELECT 
        "guests"."id" AS "guest_id",
        "party_id",
        "guests"."name" AS "guest_name",
        "meal_id",
        "meal_name",
        "guests"."response" AS "guest_response",
        "meal_options"."event_id"
        FROM "guests"
        JOIN "meal_options" ON "guests"."meal_id" = "meal_options"."id"
        JOIN "events" ON "meal_options"."event_id" = "events"."id"
        WHERE "event_id" = $1
        ORDER BY "guest_id" ASC;
    `;

    const sqlValue = [req.params.id];
    
    pool.query(sqlQuery, sqlValue)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((dbErr) => {
            console.error('Error /api/partyGuests GET all:', dbErr);
            res.sendStatus(500);
        })
})


module.exports = router;
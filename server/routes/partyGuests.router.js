const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    const party_id = req.params.id;
    console.log('sending guests with party_id', party_id)

    const sqlQuery = 
    `
    SELECT "guests"."id" AS "guest_id", "party"."id" AS "party_id", 
    "guests"."name" AS "guest_name", "party"."name" AS "party_name"
        FROM "guests"
        JOIN "party" ON "guests"."party_id" = "party"."id"
        WHERE "guests"."party_id" = $1
        ORDER BY "guest_id" ASC;
    `;
    const sqlValue = [party_id]
    pool.query(sqlQuery, sqlValue)
    .then(dbRes => {
        res.send(dbRes.rows);
        console.log('here are the guests you requested', dbRes.rows);
     })
     .catch(dbErr => {
        console.log('GET route for partyGuests failed', dbErr);
        res.sendStatus(500);
     })
});

module.exports = router;
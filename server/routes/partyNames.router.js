const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in partyNames.router GET route for Party Names', req.body.id)
    const sqlQuery = 
    `
    SELECT "party"."id", "party"."name", "party"."event_id", "events"."event_name"
    FROM "party"
    JOIN "events" ON "party"."event_id" = "events"."id"
    WHERE "events"."event_code" = 'noice'
    ORDER BY "name" ASC;
    `;

    pool.query(sqlQuery)
     .then(dbRes => {
        res.send(dbRes.rows)
     })
     .catch(dbErr => {
        console.log('GET route for partyNames failed', dbErr)
        res.sendStatus(500);
     })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
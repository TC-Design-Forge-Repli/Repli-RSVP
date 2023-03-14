const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    console.log(req.params.id)
   //  console.log('in partyNames.router GET route for Party Names', req.body.id)
    const sqlQuery = 
    `
    SELECT "party"."id", "party"."name", "party"."event_id", "events"."event_name", "events"."event_code"
    FROM "party"
    JOIN "events" ON "party"."event_id" = "events"."id"
    WHERE "events"."event_code" = $1
    ORDER BY "name" ASC;
    `;
   const sqlValue = [req.params.id]
    pool.query(sqlQuery, sqlValue)
     .then(dbRes => {
        res.send(dbRes.rows)
     })
     .catch(dbErr => {
        console.log('GET route for partyNames failed', dbErr)
        res.sendStatus(500);
     })

});

router.delete('/:id', (req, res) =>{
   const partyId = req.params.id

   const sqlQuery = `
   DELETE FROM "party"
   WHERE "id" = $1;
   `
   const sqlValue = [partyId]
   pool.query(sqlQuery, sqlValue)
       .then((dbRes) =>{
           res.sendStatus(200)
       })
       .catch((dbErr) =>{
           console.log('Problem deleting one party in server', dbErr);
           res.sendStatus(500)
       })
})

module.exports = router;
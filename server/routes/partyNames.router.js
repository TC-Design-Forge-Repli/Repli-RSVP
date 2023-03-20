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
    SELECT 
"guests".id AS guest_id,
"guests"."name" AS guest_name,
"guests".response AS guest_response,
"guests".party_id AS id,
"guests".meal_id AS meal_id,
"party"."name", 
"party"."event_id",
"events"."event_name", 
"events"."event_code"
    
FROM "guests"
	JOIN "party" ON "party".id = "guests".party_id
    JOIN "events" ON "party"."event_id" = "events"."id"
    WHERE "events"."event_code" = $1
    ORDER BY "name" ASC;
    `;
   const sqlValue = [req.params.id]
   pool.query(sqlQuery, sqlValue)
      .then(dbRes => {
         console.log(dbRes.rows)
         let newArray = [];
         for (let i = 0; i < dbRes.rows.length; i++) {
            let partyObject = {
               id: dbRes.rows[i].id,
               name: dbRes.rows[i].name,
               guests: []
            }
            for (let x = 0; x < dbRes.rows.length; x++) {
               let guestObject = {}
                  if (dbRes.rows[i].id === dbRes.rows[x].id) {
                     guestObject.guest_id = dbRes.rows[x].guest_id
                     guestObject.guest_name = dbRes.rows[x].guest_name
                     guestObject.guest_response = dbRes.rows[x].guest_response
                     guestObject.meal_id = dbRes.rows[x].meal_id
                     partyObject.guests.push(guestObject)
                  }
            }
            newArray.push(partyObject);
         }
         console.log(newArray)
         // Declare a new array
         let uniqueArray = [];

         // Declare an empty object
         let uniqueObject = {};

         // Loop for the array elements
         for (let i in newArray) {

            // Extract the id
            objid = newArray[i]['id'];

            // Use the id as the index
            uniqueObject[objid] = newArray[i];
         }

         // Loop to push unique object into array
         for (i in uniqueObject) {
            uniqueArray.push(uniqueObject[i]);
         }
         console.log(uniqueArray)
         res.send(uniqueArray)
      })
      .catch(dbErr => {
         console.log('GET route for partyNames failed', dbErr)
         res.sendStatus(500);
      })

});

router.delete('/:id', (req, res) => {
   const partyId = req.params.id

   const sqlQuery = `
   DELETE FROM "party"
   WHERE "id" = $1;
   `
   const sqlValue = [partyId]
   pool.query(sqlQuery, sqlValue)
      .then((dbRes) => {
         res.sendStatus(200)
      })
      .catch((dbErr) => {
         console.log('Problem deleting one party in server', dbErr);
         res.sendStatus(500)
      })
})

module.exports = router;